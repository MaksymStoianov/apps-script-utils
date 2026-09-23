/**
 * Copies one worked example into the JSDoc of every exported symbol that has none.
 *
 * The published example of a function lives in `docs/content/en/functions/`, which
 * is where it is written, translated and checked. An IDE never sees that file: it
 * shows the JSDoc comment above the declaration. This script closes that gap by
 * writing the first example of each symbol into its comment, so the hover and the
 * page say the same thing.
 *
 * A symbol whose comment already carries an `@example` is left alone — a hand-written
 * example is better than a copied one, and this script never overwrites one.
 *
 * Usage: `node scripts/docs/sync-jsdoc-examples.mjs [--check]`
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const SRC = join(ROOT, "src");

const CONTENT = join(ROOT, "docs/content/en/functions");

const CHECK = process.argv.includes("--check");

/**
 * How many lines of code an example may carry before it is too long for a hover.
 */
const MAX_LINES = 12;

function listSources(dir) {
  const out = [];

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);

    if (statSync(full).isDirectory()) {
      out.push(...listSources(full));

      continue;
    }

    if (entry.endsWith(".ts") && entry !== "index.ts") {
      out.push(full);
    }
  }

  return out;
}

/**
 * The first JavaScript block of a symbol's first example, trimmed to hover length.
 */
function exampleOf(name) {
  let raw = null;

  try {
    raw = readFileSync(join(CONTENT, `${name}.json`), "utf8");
  } catch {
    return null;
  }

  for (const example of JSON.parse(raw).examples ?? []) {
    const fence = (example.body ?? "").match(/```javascript\n([\s\S]*?)```/);

    if (!fence) {
      continue;
    }

    const lines = fence[1].trimEnd().split("\n");

    if (lines.length === 0 || lines.length > MAX_LINES) {
      continue;
    }

    return lines;
  }

  return null;
}

function isExported(node) {
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
}

function nameOf(statement) {
  if (ts.isFunctionDeclaration(statement) && statement.name) {
    return statement.name.getText();
  }

  if (ts.isClassDeclaration(statement) && statement.name) {
    return statement.name.getText();
  }

  if (ts.isInterfaceDeclaration(statement)) {
    return statement.name.getText();
  }

  if (ts.isTypeAliasDeclaration(statement)) {
    return statement.name.getText();
  }

  if (ts.isEnumDeclaration(statement)) {
    return statement.name.getText();
  }

  return null;
}

let written = 0;

let skipped = 0;

const stale = [];

for (const file of listSources(SRC).sort()) {
  const original = readFileSync(file, "utf8");

  const source = ts.createSourceFile(file, original, ts.ScriptTarget.ESNext, true);

  const insertions = [];

  const documented = new Set();

  for (const statement of source.statements) {
    if (!isExported(statement)) {
      continue;
    }

    const name = nameOf(statement);

    const blocks = statement.jsDoc ?? [];

    if (!name || blocks.length === 0 || documented.has(name)) {
      continue;
    }

    // Overloads share a name; the comment that carries the documentation is the last one.
    documented.add(name);

    const comment = blocks[blocks.length - 1];

    const text = original.slice(comment.getStart(source, false), comment.getEnd());

    if (text.includes("@example")) {
      skipped += 1;

      continue;
    }

    const lines = exampleOf(name);

    if (!lines) {
      skipped += 1;

      continue;
    }

    const indent = " ".repeat(
      comment.getStart(source, false) -
        original.lastIndexOf("\n", comment.getStart(source, false)) -
        1
    );

    const commentLines = text.split("\n");

    const firstTag = commentLines.findIndex((line) => /^\s*\*\s*@\w/.test(line));

    const at = firstTag === -1 ? commentLines.length - 1 : firstTag;

    const block = [
      `${indent} * @example`,
      `${indent} * \`\`\`javascript`,
      ...lines.map((line) => `${indent} * ${line}`.trimEnd()),
      `${indent} * \`\`\``,
      `${indent} *`
    ];

    commentLines.splice(at, 0, ...block);

    insertions.push({
      start: comment.getStart(source, false),
      end: comment.getEnd(),
      text: commentLines.join("\n")
    });
  }

  if (insertions.length === 0) {
    continue;
  }

  // Apply from the end so the earlier offsets stay valid.
  let updated = original;

  for (const insertion of insertions.reverse()) {
    updated = updated.slice(0, insertion.start) + insertion.text + updated.slice(insertion.end);
  }

  if (CHECK) {
    stale.push(relative(ROOT, file));

    continue;
  }

  writeFileSync(file, updated);
  written += insertions.length;
}

if (CHECK && stale.length > 0) {
  console.error("These sources have a documented example that their JSDoc does not carry:");

  for (const path of stale.slice(0, 20)) {
    console.error(`  ${path}`);
  }

  if (stale.length > 20) {
    console.error(`  … and ${stale.length - 20} more`);
  }

  process.exit(1);
}

console.log(`${written} examples written into JSDoc · ${skipped} symbols left as they were`);
