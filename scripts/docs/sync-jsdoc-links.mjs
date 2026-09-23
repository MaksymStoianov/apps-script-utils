/**
 * Links the JSDoc of every exported symbol to its published page, and to the
 * Apps Script reference for the Google types its signature names.
 *
 * A published page already links back to its source on GitHub. The comment above
 * that source linked to nothing, so an IDE hover was a dead end: no way to the
 * page, its translations, or the reference for the `Sheet` in the signature.
 *
 * Both lines are written as `@see`, both are recognised on sight, and a comment
 * that already carries the link is left alone — this script never writes a
 * duplicate and never reorders what a person wrote.
 *
 * Usage: `node scripts/docs/sync-jsdoc-links.mjs [--check]`
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { SITE } from "./languages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const SRC = join(ROOT, "src");

const CHECK = process.argv.includes("--check");

/**
 * The Apps Script services this library touches, as they appear in a type name
 * and in the URL of Google's reference.
 */
const SERVICES = new Map([
  ["Base", "base"],
  ["Card_Service", "card-service"],
  ["Content", "content"],
  ["Document", "document"],
  ["Drive", "drive"],
  ["Forms", "forms"],
  ["HTML", "html"],
  ["Mail", "mail"],
  ["Properties", "properties"],
  ["Script", "script"],
  ["Slides", "slides"],
  ["Spreadsheet", "spreadsheet"],
  ["URL_Fetch", "url-fetch"],
  ["Utilities", "utilities"]
]);

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
 * `RichTextValue` is `rich-text-value` in a URL; `HtmlOutput` is `html-output`.
 */
function kebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Every Apps Script class a declaration names, as reference URLs.
 */
function referencesOf(text) {
  const urls = new Map();

  for (const [, service, klass] of text.matchAll(/GoogleAppsScript\.(\w+)\.(\w+)/g)) {
    const segment = SERVICES.get(service);

    if (!segment) {
      continue;
    }

    urls.set(
      `Class ${klass}`,
      `https://developers.google.com/apps-script/reference/${segment}/${kebab(klass)}`
    );
  }

  return urls;
}

function isExported(node) {
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
}

function nameOf(statement) {
  if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && statement.name) {
    return statement.name.getText();
  }

  if (
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement) ||
    ts.isEnumDeclaration(statement)
  ) {
    return statement.name.getText();
  }

  return null;
}

let written = 0;

let links = 0;

const stale = [];

for (const file of listSources(SRC).sort()) {
  const original = readFileSync(file, "utf8");

  const source = ts.createSourceFile(file, original, ts.ScriptTarget.ESNext, true);

  const edits = [];

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

    // Writerside publishes every page in lower case, and GitHub Pages is
    // case-sensitive, so the link has to be lower case or it 404s.
    const page = `${SITE}/${name.toLowerCase()}.html`;

    const wanted = new Map([[`${name} on the documentation site`, page]]);

    for (const [label, url] of referencesOf(statement.getText(source))) {
      wanted.set(label, url);
    }

    // A link written before the casing was fixed is corrected in place rather
    // than left beside its replacement.
    const corrected = text.replace(
      new RegExp(`${SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/${name}\\.html`, "g"),
      page
    );

    const missing = [...wanted].filter(([, url]) => !corrected.includes(url));

    if (corrected !== text) {
      edits.push({
        start: comment.getStart(source, false),
        end: comment.getEnd(),
        text: corrected
      });
    }

    if (missing.length === 0) {
      continue;
    }

    const indent = " ".repeat(
      comment.getStart(source, false) -
        original.lastIndexOf("\n", comment.getStart(source, false)) -
        1
    );

    const commentLines = corrected.split("\n");

    // A `@see` belongs with the other `@see` lines; failing that, before the
    // bookkeeping tags at the end of the block.
    const anchor = (() => {
      const lastSee = commentLines.findLastIndex((line) => /^\s*\*\s*@see\b/.test(line));

      if (lastSee !== -1) {
        return lastSee + 1;
      }

      const tail = commentLines.findIndex((line) =>
        /^\s*\*\s*@(since|version|environment|author|license)\b/.test(line)
      );

      return tail === -1 ? commentLines.length - 1 : tail;
    })();

    const pad = (() => {
      const [sample] = commentLines.filter((line) => /^\s*\*\s*@see\s+/.test(line));

      const spaces = sample?.match(/@see(\s+)/)?.[1];

      return spaces && spaces.length > 1 ? spaces : " ";
    })();

    commentLines.splice(
      anchor,
      0,
      ...missing.map(([label, url]) => `${indent} * @see${pad}[${label}](${url})`)
    );

    links += missing.length;

    const at = edits.findIndex((edit) => edit.start === comment.getStart(source, false));

    const replacement = {
      start: comment.getStart(source, false),
      end: comment.getEnd(),
      text: commentLines.join("\n")
    };

    if (at === -1) {
      edits.push(replacement);
    } else {
      edits[at] = replacement;
    }
  }

  if (edits.length === 0) {
    continue;
  }

  if (CHECK) {
    stale.push(relative(ROOT, file));

    continue;
  }

  // Apply from the end so the earlier offsets stay valid.
  let updated = original;

  for (const edit of edits.reverse()) {
    updated = updated.slice(0, edit.start) + edit.text + updated.slice(edit.end);
  }

  writeFileSync(file, updated);
  written += 1;
}

if (CHECK && stale.length > 0) {
  console.error("JSDoc is missing links. Run: npm run docs:sync-links");

  for (const path of stale.slice(0, 20)) {
    console.error(`  ${path}`);
  }

  if (stale.length > 20) {
    console.error(`  … and ${stale.length - 20} more`);
  }

  process.exit(1);
}

console.log(`${links} links written into ${written} files`);
