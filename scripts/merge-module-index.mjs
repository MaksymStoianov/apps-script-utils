#!/usr/bin/env node

/**
 * Git merge driver for the module index files under `src/`.
 *
 * An index file is a list of the module's members: one line per member, either
 * `export * from "./name";` once it exists or `// TODO: name` while it does
 * not. A branch that adds a function flips exactly one of those lines, so two
 * branches adding neighbouring functions conflict even though their edits are
 * independent.
 *
 * This driver merges the list entry by entry, keyed by the member name. An
 * entry flipped on one side takes that side's line, entries either side adds
 * are kept, and anything the two sides say differently about the same entry —
 * or any line that is neither an export nor a TODO placeholder, other than the
 * blank lines and section comments the files already carry — falls back to
 * `git merge-file` so that a human resolves it.
 *
 * Registered by `.gitattributes` plus the config that
 * `scripts/setup-merge-driver.sh` writes.
 *
 * Usage: node scripts/merge-module-index.mjs %O %A %B %L %P
 *   %O  common ancestor   %A  ours, also the file the result is written to
 *   %B  theirs            %L  conflict marker size   %P  the real pathname
 */

import { readFileSync, writeFileSync } from "node:fs";

import { format, mergeEntries, mergeFile } from "./lib/three-way-merge.mjs";

const EXPORT = /^export \* from "\.\/(.+)";$/;

// A placeholder names one member, and often sketches the signature it will
// have. The name is what keys the entry; everything in the parentheses is a
// note to the reader and varies freely between branches.
//
// A note that names no member — `// TODO: Abstract EventEmitter` — deliberately
// does not match: it would key on `Abstract`, which its siblings share.
const TODO = /^\/\/ TODO: ([A-Za-z_$][\w$]*)(?:\(|$)/;

const [ancestorPath, oursPath, theirsPath, markerSize = "7", pathname] = process.argv.slice(2);

/**
 * Reads an index file as a list of named entries.
 *
 * Each entry owns the blank lines that follow it, so that flipping a TODO into
 * an export carries the spacing the flipping side chose. Lines that name no
 * member — a section comment — are kept as entries of their own, keyed by their
 * own text, so they hold their place. Returns null for a file shaped any other
 * way, which sends the merge down the fallback path.
 *
 * @param {string} text
 * @returns {{ name: string, text: string }[] | null}
 */
function parse(text) {
  // A module whose members are all still to come has an empty index file.
  if (text === "") {
    return [];
  }

  const lines = text.split("\n");

  const entries = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line === "") {
      // Blank lines belong to the entry above; a file that opens with one has
      // nothing to attach it to.
      if (!entries.length) {
        return null;
      }

      entries[entries.length - 1].text += "\n";

      continue;
    }

    const match = EXPORT.exec(line) ?? TODO.exec(line);

    if (match) {
      entries.push({ name: match[1], text: line });

      continue;
    }

    if (line.startsWith("//")) {
      entries.push({ name: line, text: line });

      continue;
    }

    return null;
  }

  return entries;
}

/**
 * Settles export-against-placeholder disagreements in favour of the export.
 *
 * A `// TODO:` line is the state a member is in before it exists, never a
 * decision to stop exporting one: dropping a member deletes its file and its
 * line with it. So when one side exports a member and another still carries the
 * placeholder, the placeholder is the older state, whatever the three-way
 * comparison says about which side moved. It says the wrong thing often here,
 * because a branch that resolved an earlier conflict badly carries the
 * placeholder as a change away from an export the ancestor had — and honouring
 * that is how twenty-seven exports were lost.
 *
 * @param {...{ name: string, text: string }[]} sides
 */
function restoreExports(...sides) {
  const exported = new Map();

  for (const side of sides) {
    for (const entry of side) {
      if (EXPORT.test(entry.text.split("\n")[0])) {
        exported.set(entry.name, entry);
      }
    }
  }

  for (const side of sides) {
    const ownExports = new Set(
      side.filter((entry) => EXPORT.test(entry.text.split("\n")[0])).map((entry) => entry.name)
    );

    // Backwards, so that removing an entry does not move the ones still to
    // come.
    for (let i = side.length - 1; i >= 0; i -= 1) {
      const entry = side[i];

      if (!TODO.test(entry.text.split("\n")[0])) {
        continue;
      }

      const known = exported.get(entry.name);

      if (!known) {
        continue;
      }

      // A placeholder sitting beside an export of the same member, on the same
      // side, is a leftover from a merge that should have replaced it. Adopting
      // the export line here would write that line twice.
      if (ownExports.has(entry.name)) {
        side.splice(i, 1);

        continue;
      }

      entry.text = known.text;
    }
  }
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

  restoreExports(a, o, t);

  // An entry added here belongs where the side that added it put it, not in
  // alphabetical order: these files group members by kind, and only the groups
  // themselves run alphabetically.
  const merged = mergeEntries(a, o, t);

  if (!merged) {
    return fallback();
  }

  writeFileSync(oursPath, format(merged.map((entry) => entry.text).join("\n"), pathname));

  return 0;
}

process.exit(main());
