/**
 * Checks that the README translations still match README.md in shape.
 *
 * For every language below it fails when:
 *
 * - `docs/readme/README.<code>.md` is missing;
 * - the language switcher is missing from it (or from README.md), or differs
 *   from the expected line, which shows the current language in bold and links
 *   the others;
 * - a relative link in it (or in README.md) points to a file that does not
 *   exist, such as a repository-root path not rewritten for `docs/readme/`;
 * - its number of `##` and `###` headings differs from README.md;
 * - the version in its translation note, the blockquote right after the
 *   switcher, differs from the `version` in package.json.
 *
 * A right-to-left translation wraps its prose in `<div dir="rtl" ...>` blocks.
 * Those wrapper lines are skipped when looking for the note, and the headings
 * inside them still count, since they stay `##`/`###` lines of their own.
 *
 * It does not compare wording: a translation can be out of date and still
 * pass. The version note is what says which README.md it was made from.
 *
 * README.md stays in the repository root and links the translations as
 * `docs/readme/README.<code>.md`. Inside `docs/readme/` a translation links the
 * others as `README.<code>.md` and English as `../../README.md`.
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
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "cs", name: "Čeština" },
  { code: "tr", name: "Türkçe" },
  { code: "ar", name: "العربية" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "简体中文" },
  { code: "zh-TW", name: "繁體中文" }
];

/**
 * The folder of the translations, relative to the repository root.
 */
const TRANSLATIONS_DIR = "docs/readme";

const fileOf = (code) => (code === "en" ? "README.md" : `${TRANSLATIONS_DIR}/README.${code}.md`);

/**
 * The link to the README of `code` as written in the README of `from`.
 */
function linkTo(code, from) {
  if (from === "en") {
    return fileOf(code);
  }

  return code === "en" ? "../../README.md" : `README.${code}.md`;
}

/**
 * The switcher line as it has to appear in the README of `current`.
 */
function switcherFor(current) {
  return LANGUAGES.map(({ code, name }) => {
    const file = linkTo(code, current);

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

/**
 * Whether the line only opens or closes a right-to-left wrapper block.
 */
function isRtlWrapper(line) {
  return /^<div\b[^>]*\bdir="rtl"[^>]*>$/.test(line.trim()) || line.trim() === "</div>";
}

/**
 * The relative link targets in `lines` that do not exist, resolved from `dir`.
 *
 * Markdown links and `href`/`src`/`srcset` attributes are checked; absolute
 * URLs, `mailto:` links and same-file `#anchors` are skipped.
 */
function missingLinks(lines, dir) {
  const missing = [];

  for (const line of lines) {
    const targets = [
      ...[...line.matchAll(/\]\(([^)\s]+)/g)].map((match) => match[1]),
      ...[...line.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]),
      ...[...line.matchAll(/\bsrcset="([^"]+)"/g)].flatMap((match) =>
        match[1].split(",").map((entry) => entry.trim().split(/\s+/)[0])
      )
    ];

    for (const target of targets) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) {
        continue;
      }

      if (!existsSync(resolve(dir, decodeURIComponent(target.split("#")[0])))) {
        missing.push(target);
      }
    }
  }

  return missing;
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

for (const target of missingLinks(sourceLines, ROOT)) {
  problems.push(`README.md: the link target ${target} does not exist`);
}

for (const { code } of LANGUAGES.slice(1)) {
  const file = fileOf(code);

  const path = join(ROOT, file);

  if (!existsSync(path)) {
    problems.push(`${file}: missing`);

    continue;
  }

  const lines = proseLines(readFileSync(path, "utf8"));

  for (const target of missingLinks(lines, dirname(path))) {
    problems.push(`${file}: the link target ${target} does not exist`);
  }

  const switcherAt = lines.indexOf(switcherFor(code));

  if (switcherAt === -1) {
    problems.push(`${file}: the language switcher is missing or differs from the expected line`);
  } else {
    const note = lines
      .slice(switcherAt + 1)
      .find((line) => line.trim() !== "" && !isRtlWrapper(line));

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
