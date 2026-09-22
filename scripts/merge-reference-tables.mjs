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

import { readFileSync, writeFileSync } from "node:fs";

import { byName, format, mergeEntries, mergeFile } from "./lib/three-way-merge.mjs";

const ROW = /^\|\s*\[`([^`]+)`\]/;

const SEPARATOR = /^\|[\s:-]+\|/;

const PLACEHOLDER = (index) => `<!--@@REFERENCE_TABLE_${index}@@-->`;

const [ancestorPath, oursPath, theirsPath, markerSize = "7", pathname] = process.argv.slice(2);

/**
 * Splits a file into tables and the text around them.
 *
 * A table is a run of lines starting with `|`; its first two lines are the
 * header and the alignment separator, and the rest are rows. Runs shaped any
 * other way are left as text, so a table of anything but functions passes
 * through untouched.
 *
 * @param {string} text
 * @returns {{ skeleton: string, tables: { head: string[], rows: { name: string, text: string }[] }[] }}
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
        rows.push({ name: match[1], text: line });
      } else {
        head.push(line);
      }
    }

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

  // Tables added or removed wholesale are rare enough not to be worth guessing
  // at which one lines up with which.
  if (a.tables.length !== o.tables.length || a.tables.length !== t.tables.length) {
    return fallback();
  }

  const tables = [];

  for (let i = 0; i < a.tables.length; i += 1) {
    const rows = mergeEntries(a.tables[i].rows, o.tables[i].rows, t.tables[i].rows, byName);

    if (!rows) {
      return fallback();
    }

    const head =
      a.tables[i].head.join("\n") === o.tables[i].head.join("\n")
        ? t.tables[i].head
        : o.tables[i].head;

    tables.push([...head, ...rows.map((row) => row.text)].join("\n"));
  }

  const skeleton = mergeFile(a.skeleton, o.skeleton, t.skeleton, markerSize);

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

  writeFileSync(oursPath, format(merged, pathname));

  return 0;
}

process.exit(main());
