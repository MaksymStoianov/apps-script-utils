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
 * The tables of the three sides are paired by the heading above them rather
 * than by position, because a module's first function gives its section its
 * first table and pairing by position would then line every later table up
 * against the wrong one. A table only one side has passes through; a heading
 * that repeats in one file, or a table under no heading at all, falls back.
 *
 * Registered by `.gitattributes` plus the config that
 * `scripts/setup-merge-driver.sh` writes.
 *
 * Usage: node scripts/merge-reference-tables.mjs %O %A %B %L %P
 *   %O  common ancestor   %A  ours, also the file the result is written to
 *   %B  theirs            %L  conflict marker size   %P  the real pathname
 */

import { readFileSync, writeFileSync } from "node:fs";

import { byName, format, mergeEntries, mergeFile } from "./lib/three-way-merge.mjs";

const ROW = /^\|\s*\[`([^`]+)`\]/;

const SEPARATOR = /^\|[\s:-]+\|/;

const HEADING = /^#{1,6}\s+(.+)$/;

const PLACEHOLDER = (key) => `<!--@@REFERENCE_TABLE_${key}@@-->`;

/**
 * Turns a heading into a token that survives being written into the skeleton
 * and merged as ordinary text.
 *
 * @param {string} heading
 * @returns {string | null} the key, or null for a heading that yields none
 */
function keyOf(heading) {
  const key = heading.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return key === "" ? null : key;
}

const [ancestorPath, oursPath, theirsPath, markerSize = "7", pathname] = process.argv.slice(2);

/**
 * Splits a file into tables and the text around them.
 *
 * A table is a run of lines starting with `|`; its first two lines are the
 * header and the alignment separator, and the rest are rows. Runs shaped any
 * other way are left as text, so a table of anything but functions passes
 * through untouched.
 *
 * Each table is keyed by the heading above it. Returns null when a table has no
 * heading to key it by, or when two tables would claim the same key, either of
 * which sends the merge down the fallback path.
 *
 * @param {string} text
 * @returns {{ skeleton: string, tables: Map<string, { head: string[], rows: { name: string, text: string }[] }> }|null}
 */
function parse(text) {
  const lines = text.split("\n");

  const skeleton = [];

  const tables = new Map();

  let heading = "";

  for (let i = 0; i < lines.length; ) {
    const title = HEADING.exec(lines[i]);

    if (title) {
      heading = title[1].trim();
    }

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
        rows.push({ name: match[1], text: line });
      } else {
        head.push(line);
      }
    }

    const shaped = rows.length && head.length === 2 && SEPARATOR.test(head[1]);

    if (shaped) {
      const key = keyOf(heading);

      if (key === null || tables.has(key)) {
        return null;
      }

      skeleton.push(PLACEHOLDER(key));
      tables.set(key, { head, rows });
    } else {
      skeleton.push(...block);
    }

    i = end;
  }

  return { skeleton: skeleton.join("\n"), tables };
}

/**
 * Merges the one table that all three sides, or only some of them, carry under
 * a given heading.
 *
 * @param {{ head: string[], rows: { name: string, text: string }[] }|undefined} base
 * @param {{ head: string[], rows: { name: string, text: string }[] }|undefined} mine
 * @param {{ head: string[], rows: { name: string, text: string }[] }|undefined} yours
 * @returns {string | null | undefined} the table's text, undefined when it is gone, null to fall back
 */
function mergeTable(base, mine, yours) {
  // Gone from both sides: the section lost its table, and nothing is written.
  if (!mine && !yours) {
    return undefined;
  }

  if (!mine || !yours) {
    const kept = mine ?? yours;

    // Added on one side only: it passes through as that side wrote it.
    if (!base) {
      return [...kept.head, ...kept.rows.map((row) => row.text)].join("\n");
    }

    // Removed on one side: dropping it is only safe while the other side left
    // its rows alone.
    const before = base.rows.map((row) => row.text).join("\n");

    return kept.rows.map((row) => row.text).join("\n") === before ? undefined : null;
  }

  const rows = mergeEntries(base ? base.rows : [], mine.rows, yours.rows, byName);

  if (!rows) {
    return null;
  }

  const head = base && base.head.join("\n") === mine.head.join("\n") ? yours.head : mine.head;

  return [...head, ...rows.map((row) => row.text)].join("\n");
}

function main() {
  const ancestor = readFileSync(ancestorPath, "utf8");

  const ours = readFileSync(oursPath, "utf8");

  const theirs = readFileSync(theirsPath, "utf8");

  const fallback = () => {
    const { text, conflicted } = mergeFile(ancestor, ours, theirs, markerSize);

    writeFileSync(oursPath, text);

    return conflicted ? 1 : 0;
  };

  const a = parse(ancestor);

  const o = parse(ours);

  const t = parse(theirs);

  if (!a || !o || !t) {
    return fallback();
  }

  const keys = new Set([...a.tables.keys(), ...o.tables.keys(), ...t.tables.keys()]);

  const tables = new Map();

  for (const key of keys) {
    const table = mergeTable(a.tables.get(key), o.tables.get(key), t.tables.get(key));

    if (table === null) {
      return fallback();
    }

    if (table !== undefined) {
      tables.set(key, table);
    }
  }

  const skeleton = mergeFile(a.skeleton, o.skeleton, t.skeleton, markerSize);

  if (skeleton.conflicted) {
    return fallback();
  }

  let merged = skeleton.text;

  for (const [key, table] of tables) {
    const placeholder = PLACEHOLDER(key);

    if (!merged.includes(placeholder)) {
      return fallback();
    }

    merged = merged.replace(placeholder, () => table);
  }

  if (merged.includes("<!--@@REFERENCE_TABLE_")) {
    return fallback();
  }

  writeFileSync(oursPath, format(merged, pathname));

  return 0;
}

process.exit(main());
