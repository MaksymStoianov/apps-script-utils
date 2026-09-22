/**
 * Shared parts of the repository's merge drivers.
 *
 * Both drivers face the same shape of conflict: a file that is a list of
 * entries, each identified by a function name, that every branch adds to or
 * flips one line of. `mergeEntries` resolves that list; `mergeFile` and
 * `format` deal with the text around it.
 *
 * @see scripts/merge-reference-tables.mjs
 * @see scripts/merge-module-index.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * An entry of a mergeable list: a name to key it by and the text to write out.
 *
 * @typedef {{ name: string, text: string }} Entry
 */

/**
 * Three-way merges a list of named entries, or returns null when the sides
 * disagree over one of them.
 *
 * Entries the ancestor has keep its order. An entry changed on one side takes
 * that side's text; changed differently on both, or changed on one side and
 * deleted on the other, is a disagreement. Entries neither side inherited are
 * inserted after the entry they followed on their own side, and entries that
 * land in the same place are ordered by `compare` so that the outcome does not
 * depend on which side Git calls ours.
 *
 * @param {Entry[]} ancestor
 * @param {Entry[]} ours
 * @param {Entry[]} theirs
 * @param {(a: Entry, b: Entry) => number} [compare]
 * @returns {Entry[] | null}
 */
export function mergeEntries(ancestor, ours, theirs, compare) {
  const index = (entries) => new Map(entries.map((entry) => [entry.name, entry]));

  const base = index(ancestor);

  const mine = index(ours);

  const yours = index(theirs);

  const merged = [];

  for (const entry of ancestor) {
    const o = mine.get(entry.name);

    const t = yours.get(entry.name);

    // Deleted on one side: dropping it is only safe while the other side left it
    // alone.
    if (!o || !t) {
      const survivor = o ?? t;

      if (survivor && survivor.text !== entry.text) {
        return null;
      }

      continue;
    }

    const changedByUs = o.text !== entry.text;

    const changedByThem = t.text !== entry.text;

    if (changedByUs && changedByThem && o.text !== t.text) {
      return null;
    }

    merged.push(changedByUs ? o : t);
  }

  const kept = new Set(merged.map((entry) => entry.name));

  const added = new Map();

  for (const entries of [ours, theirs]) {
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];

      if (base.has(entry.name) || kept.has(entry.name)) {
        continue;
      }

      const seen = added.get(entry.name);

      if (seen) {
        // Both sides added it. The same text twice is the same edit; different
        // text is a disagreement only a human can settle.
        if (seen.entry.text !== entry.text) {
          return null;
        }

        continue;
      }

      let anchor = null;

      for (let j = i - 1; j >= 0; j -= 1) {
        if (kept.has(entries[j].name)) {
          anchor = entries[j].name;

          break;
        }
      }

      added.set(entry.name, { entry, anchor });
    }
  }

  const byAnchor = new Map();

  for (const { entry, anchor } of added.values()) {
    if (!byAnchor.has(anchor)) {
      byAnchor.set(anchor, []);
    }

    byAnchor.get(anchor).push(entry);
  }

  for (const [anchor, entries] of byAnchor) {
    if (compare) {
      entries.sort(compare);
    }

    const at = anchor === null ? 0 : merged.findIndex((entry) => entry.name === anchor) + 1;

    merged.splice(at, 0, ...entries);
  }

  return merged;
}

/**
 * Orders entries the way the documentation tables and module indexes do.
 */
export function byName(a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

/**
 * Runs `git merge-file` and reports whether it left conflict markers behind.
 *
 * @param {string} ancestor
 * @param {string} ours
 * @param {string} theirs
 * @param {string} markerSize
 * @returns {{ text: string, conflicted: boolean }}
 */
export function mergeFile(ancestor, ours, theirs, markerSize) {
  const dir = mkdtempSync(join(tmpdir(), "three-way-merge-"));

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
 * Reformats merged text the way Prettier writes it.
 *
 * Prettier is told the real pathname rather than handed the file, because the
 * file Git passes to a merge driver is a temporary one whose name carries no
 * extension for Prettier to infer a parser from.
 *
 * @param {string} text
 * @param {string | undefined} pathname
 * @returns {string} the formatted text, or the text unchanged if Prettier cannot run
 */
export function format(text, pathname) {
  if (!pathname) {
    return text;
  }

  try {
    const prettier = fileURLToPath(new URL("../../node_modules/.bin/prettier", import.meta.url));

    return execFileSync(prettier, ["--stdin-filepath", pathname], {
      input: text,
      encoding: "utf8"
    });
  } catch {
    // Prettier is a convenience here, not a requirement: unformatted output is
    // still a correct merge, and `npm run format` reports the drift.
    return text;
  }
}
