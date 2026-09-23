/**
 * Prepares the assembled site for crawlers.
 *
 * Writerside knows nothing about the other language builds, so three things
 * that only exist once every language sits in one directory are written here:
 *
 * - a static `hreflang` link in the `head` of every page, pointing at the same
 *   page in each language. Static matters: Google renders JavaScript, but Bing
 *   and the answer-engine crawlers — GPTBot, ClaudeBot, PerplexityBot, CCBot —
 *   read the HTML as served, and a link added by a script is invisible to them;
 * - one `sitemap.xml` listing every page of every language, each entry carrying
 *   the same alternates, which is the form a crawler is most likely to honour;
 * - `robots.txt`, pointing at that sitemap.
 *
 * Usage: `node scripts/docs/finalize-site.mjs <site-directory>`
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

import { LANGUAGES, SITE, SOURCE_LANGUAGE } from "./languages.mjs";

const root = process.argv[2];

if (!root) {
  console.error("Usage: node scripts/docs/finalize-site.mjs <site-directory>");
  process.exit(1);
}

const SKIP = new Set(["_llms", "assets", "images", "webhelp-assets"]);

const CODES = new Set(
  LANGUAGES.filter((language) => language !== SOURCE_LANGUAGE).map((l) => l.code)
);

/**
 * Every HTML page of one language, as paths relative to that language's root.
 */
function pagesOf(dir, base = dir) {
  const pages = [];

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);

    if (statSync(full).isDirectory()) {
      if (SKIP.has(entry) || (dir === base && CODES.has(entry))) {
        continue;
      }

      pages.push(...pagesOf(full, base));

      continue;
    }

    if (entry.endsWith(".html")) {
      pages.push(relative(base, full).split("\\").join("/"));
    }
  }

  return pages;
}

function urlOf(language, page) {
  return `${language.webRoot}/${page}`;
}

const pages = pagesOf(root);

const entries = [];

let linked = 0;

for (const page of pages) {
  const present = LANGUAGES.filter((language) => {
    const path = language === SOURCE_LANGUAGE ? join(root, page) : join(root, language.code, page);

    try {
      return statSync(path).isFile();
    } catch {
      return false;
    }
  });

  if (present.length === 0) {
    continue;
  }

  const alternates = present
    .map(
      (language) =>
        `<link rel="alternate" hreflang="${language.code}" href="${urlOf(language, page)}"/>`
    )
    .join("\n    ");

  const xDefault = `<link rel="alternate" hreflang="x-default" href="${SITE}/${page}"/>`;

  for (const language of present) {
    const path = language === SOURCE_LANGUAGE ? join(root, page) : join(root, language.code, page);

    const html = readFileSync(path, "utf8");

    if (html.includes('rel="alternate" hreflang=')) {
      continue;
    }

    const at = html.indexOf("</head>");

    if (at === -1) {
      continue;
    }

    writeFileSync(
      path,
      `${html.slice(0, at)}    ${alternates}\n    ${xDefault}\n${html.slice(at)}`
    );
    linked += 1;
  }

  entries.push({ page, present });
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
];

for (const { page, present } of entries) {
  for (const language of present) {
    sitemap.push("  <url>");
    sitemap.push(`    <loc>${urlOf(language, page)}</loc>`);

    for (const other of present) {
      sitemap.push(
        `    <xhtml:link rel="alternate" hreflang="${other.code}" href="${urlOf(other, page)}"/>`
      );
    }

    sitemap.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/${page}"/>`);
    sitemap.push("    <changefreq>weekly</changefreq>");
    sitemap.push("  </url>");
  }
}

sitemap.push("</urlset>");
sitemap.push("");

writeFileSync(join(root, "sitemap.xml"), sitemap.join("\n"));

writeFileSync(
  join(root, "robots.txt"),
  ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE}/sitemap.xml`, ""].join("\n")
);

// The per-language llms.txt files are written by the builder; this points at them.
writeFileSync(
  join(root, "llms-languages.txt"),
  [
    "# apps-script-utils — documentation in five languages",
    "",
    ...LANGUAGES.map((language) => `- ${language.name}: ${language.webRoot}/llms.txt`),
    ""
  ].join("\n")
);

console.log(
  `${entries.length} pages · ${linked} pages given hreflang links · sitemap.xml, robots.txt and llms-languages.txt written`
);
