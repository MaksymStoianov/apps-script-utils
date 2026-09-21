#!/usr/bin/env node

/**
 * Git merge driver for the reference tables in `docs/writerside/topics/`.
 *
 * Every branch adds one function to the same alphabetically ordered table, so a
 * line-based merge reports a conflict whenever two branches land between the
 * same pair of neighbours. This driver merges the tables row by row, keyed by
 * the function name in the first cell: rows added on either side are kept, rows
 * deleted on either side are dropped, and rows added into the same gap are
 * ordered alphabetically. Everything outside the tables is merged by
 * `git merge-file`, and any genuine disagreement — the same row reworded on
 * both sides, or conflicting prose — falls back to `git merge-file` over the
 * whole file so that the conflict is resolved by hand.
 *
 * Registered by `.gitattributes` plus the config that
 * `scripts/setup-merge-driver.sh` writes.
 *
 * Usage: node scripts/merge-reference-tables.mjs %O %A %B %L %P
 *   %O  common ancestor   %A  ours, also the file the result is written to
 *   %B  theirs            %L  conflict marker size   %P  the real pathname
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROW = /^\|\s*\[`([^`]+)`\]/;

const SEPARATOR = /^\|[\s:-]+\|/;

const PLACEHOLDER = (index) => `<!--@@REFERENCE_TABLE_${index}@@-->`;

const [ancestorPath, oursPath, theirsPath, markerSize = "7", pathname] = process.argv.slice(2);

/**
 * Splits a file into tables and the text around them.
 *
 * A table is a run of lines starting with `|`; its first two lines are the
 * header and the alignment separator, and the rest are rows. Runs that carry no
 * named row are left as text, so tables of anything but functions pass through
 * untouched.
 *
 * @param {string} text
 * @returns {{ skeleton: string, tables: { head: string[], rows: { name: string, line: string }[] }[] }}
 */
function parse(text) {
  const lines = text.split("\n");

  const skeleton = [];

  const tables = [];

  for (let i = 0; i < lines.length; ) {
    if (!lines[i].startsWith("|")) {
      skeleton.push(lines[i]);
      i += 1;

      continue;
    }

    let end = i;

    while (end < lines.length && lines[end].startsWith("|")) {
      end += 1;
    }

    const block = lines.slice(i, end);

    const rows = [];

    const head = [];

    for (const line of block) {
      const match = ROW.exec(line);

      if (match && head.length) {
        rows.push({ name: match[1], line });
      } else {
        head.push(line);
      }
    }

    // A header, an alignment separator and at least one named row: anything else
    // is prose that happens to start with a pipe.
    if (rows.length && head.length === 2 && SEPARATOR.test(head[1])) {
      skeleton.push(PLACEHOLDER(tables.length));
      tables.push({ head, rows });
    } else {
      skeleton.push(...block);
    }

    i = end;
  }

  return { skeleton: skeleton.join("\n"), tables };
}

/**
 * Three-way merges one table's rows, or returns null when the sides disagree.
 *
 * @param {{ name: string, line: string }[]} ancestor
 * @param {{ name: string, line: string }[]} ours
 * @param {{ name: string, line: string }[]} theirs
 * @returns {{ name: string, line: string }[] | null}
 */
function mergeRows(ancestor, ours, theirs) {
  const index = (rows) => new Map(rows.map((row) => [row.name, row]));

  const base = index(ancestor);

  const mine = index(ours);

  const yours = index(theirs);

  const merged = [];

  for (const row of ancestor) {
    const o = mine.get(row.name);

    const t = yours.get(row.name);

    // Deleted on one side: dropping it is only safe while the other side left it
    // alone.
    if (!o || !t) {
      const survivor = o ?? t;

      if (survivor && survivor.line !== row.line) {
        return null;
      }

      continue;
    }

    const changedByUs = o.line !== row.line;

    const changedByThem = t.line !== row.line;

    if (changedByUs && changedByThem && o.line !== t.line) {
      return null;
    }

    merged.push(changedByUs ? o : t);
  }

  const kept = new Set(merged.map((row) => row.name));

  const added = new Map();

  for (const rows of [ours, theirs]) {
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];

      if (base.has(row.name) || kept.has(row.name)) {
        continue;
      }

      const seen = added.get(row.name);

      if (seen) {
        // Both sides added the row. Identical text is the same edit twice;
        // different text is a disagreement only a human can settle.
        if (seen.row.line !== row.line) {
          return null;
        }

        continue;
      }

      let anchor = null;

      for (let j = i - 1; j >= 0; j -= 1) {
        if (kept.has(rows[j].name)) {
          anchor = rows[j].name;

          break;
        }
      }

      added.set(row.name, { row, anchor });
    }
  }

  const byAnchor = new Map();

  for (const { row, anchor } of added.values()) {
    if (!byAnchor.has(anchor)) {
      byAnchor.set(anchor, []);
    }

    byAnchor.get(anchor).push(row);
  }

  for (const [anchor, rows] of byAnchor) {
    rows.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    const at = anchor === null ? 0 : merged.findIndex((row) => row.name === anchor) + 1;

    merged.splice(at, 0, ...rows);
  }

  return merged;
}

/**
 * Runs `git merge-file` and reports whether it left conflict markers behind.
 *
 * @param {string} ancestor
 * @param {string} ours
 * @param {string} theirs
 * @returns {{ text: string, conflicted: boolean }}
 */
function mergeFile(ancestor, ours, theirs) {
  const dir = mkdtempSync(join(tmpdir(), "reference-tables-"));

  try {
    const paths = {
      ancestor: join(dir, "base"),
      ours: join(dir, "ours"),
      theirs: join(dir, "theirs")
    };

    writeFileSync(paths.ancestor, ancestor);
    writeFileSync(paths.ours, ours);
    writeFileSync(paths.theirs, theirs);

    try {
      const text = execFileSync(
        "git",
        [
          "merge-file",
          "--stdout",
          `--marker-size=${markerSize}`,
          paths.ours,
          paths.ancestor,
          paths.theirs
        ],
        { encoding: "utf8" }
      );

      return { text, conflicted: false };
    } catch (error) {
      // A positive status is the number of conflicts; anything else is a failure
      // to merge at all, which the caller handles the same way.
      return { text: error.stdout ?? "", conflicted: true };
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Repads the merged tables the way Prettier writes them.
 *
 * A row is inserted carrying the padding it had on its own side, which rarely
 * matches the column widths of the table it lands in. Prettier is told the real
 * pathname rather than handed the file, because the file Git passes to a merge
 * driver is a temporary one whose name carries no extension for Prettier to
 * infer a parser from.
 *
 * @param {string} text
 * @returns {string} the formatted text, or the text unchanged if Prettier cannot run
 */
function format(text) {
  if (!pathname) {
    return text;
  }

  try {
    const prettier = fileURLToPath(new URL("../node_modules/.bin/prettier", import.meta.url));

    return execFileSync(prettier, ["--stdin-filepath", pathname], {
      input: text,
      encoding: "utf8"
    });
  } catch {
    // Prettier is a convenience here, not a requirement: an unpadded merge is
    // still a correct one, and `npm run format` reports the drift.
    return text;
  }
}

function main() {
  const ancestor = readFileSync(ancestorPath, "utf8");

  const ours = readFileSync(oursPath, "utf8");

  const theirs = readFileSync(theirsPath, "utf8");

  const fallback = () => {
    const { text, conflicted } = mergeFile(ancestor, ours, theirs);

    writeFileSync(oursPath, text);

    return conflicted ? 1 : 0;
  };

  const a = parse(ancestor);

  const o = parse(ours);

  const t = parse(theirs);

  // Tables added or removed wholesale are rare enough not to be worth guessing
  // at which one lines up with which.
  if (a.tables.length !== o.tables.length || a.tables.length !== t.tables.length) {
    return fallback();
  }

  const tables = [];

  for (let i = 0; i < a.tables.length; i += 1) {
    const rows = mergeRows(a.tables[i].rows, o.tables[i].rows, t.tables[i].rows);

    if (!rows) {
      return fallback();
    }

    const head =
      a.tables[i].head.join("\n") === o.tables[i].head.join("\n")
        ? t.tables[i].head
        : o.tables[i].head;

    tables.push([...head, ...rows.map((row) => row.line)].join("\n"));
  }

  const skeleton = mergeFile(a.skeleton, o.skeleton, t.skeleton);

  if (skeleton.conflicted) {
    return fallback();
  }

  let merged = skeleton.text;

  for (let i = 0; i < tables.length; i += 1) {
    const placeholder = PLACEHOLDER(i);

    if (!merged.includes(placeholder)) {
      return fallback();
    }

    merged = merged.replace(placeholder, () => tables[i]);
  }

  if (merged.includes("<!--@@REFERENCE_TABLE_")) {
    return fallback();
  }

  writeFileSync(oursPath, format(merged));

  return 0;
}

process.exit(main());
