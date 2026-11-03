/**
 * Checks that the README translations still match README.md in shape.
 *
 * For every language below it fails when:
 *
 * - `README.<code>.md` is missing;
 * - the language switcher is missing from it (or from README.md), or differs
 *   from the expected line, which shows the current language in bold and links
 *   the others;
 * - its number of `##` and `###` headings differs from README.md;
 * - the version in its translation note, the blockquote right after the
 *   switcher, differs from the `version` in package.json.
 *
 * It does not compare wording: a translation can be out of date and still
 * pass. The version note is what says which README.md it was made from.
 *
 * Usage: `npm run docs:check-i18n`
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The switcher order. `en` is README.md itself, the source of the others.
 */
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" }
];

const fileOf = (code) => (code === "en" ? "README.md" : `README.${code}.md`);

/**
 * The switcher line as it has to appear in the README of `current`.
 */
function switcherFor(current) {
  return LANGUAGES.map(({ code, name }) => {
    const file = fileOf(code);

    return code === current ? `**${name}**` : `[${name}](${file})`;
  }).join(" | ");
}

/**
 * The lines outside fenced code blocks.
 */
function proseLines(text) {
  const lines = [];

  let fenced = false;

  for (const line of text.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;

      continue;
    }

    if (!fenced) {
      lines.push(line);
    }
  }

  return lines;
}

function headingCount(lines) {
  return lines.filter((line) => /^#{2,3} \S/.test(line)).length;
}

const version = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;

const sourceLines = proseLines(readFileSync(join(ROOT, "README.md"), "utf8"));

const sourceHeadings = headingCount(sourceLines);

const problems = [];

if (!sourceLines.includes(switcherFor("en"))) {
  problems.push("README.md: the language switcher is missing or differs from the expected line");
}

for (const { code } of LANGUAGES.slice(1)) {
  const file = fileOf(code);

  const path = join(ROOT, file);

  if (!existsSync(path)) {
    problems.push(`${file}: missing`);

    continue;
  }

  const lines = proseLines(readFileSync(path, "utf8"));

  const switcherAt = lines.indexOf(switcherFor(code));

  if (switcherAt === -1) {
    problems.push(`${file}: the language switcher is missing or differs from the expected line`);
  } else {
    const note = lines.slice(switcherAt + 1).find((line) => line.trim() !== "");

    const noted = note?.startsWith(">") ? /\b\d+\.\d+\.\d+\b/.exec(note)?.[0] : undefined;

    if (!noted) {
      problems.push(`${file}: no translation note with a version right after the switcher`);
    } else if (noted !== version) {
      problems.push(`${file}: the note names version ${noted}, package.json has ${version}`);
    }
  }

  const headings = headingCount(lines);

  if (headings !== sourceHeadings) {
    problems.push(`${file}: ${headings} ##/### headings, README.md has ${sourceHeadings}`);
  }
}

if (problems.length > 0) {
  console.error("README translations are out of step with README.md:\n");

  for (const problem of problems) {
    console.error(`  ✗ ${problem}`);
  }

  console.error("\nSee “README Translations” in CONTRIBUTING.md.");
  process.exit(1);
}

const translations = LANGUAGES.length - 1;

console.log(
  `✓ ${translations} README translations match README.md ` +
    `(${sourceHeadings} headings, version ${version}).`
);
