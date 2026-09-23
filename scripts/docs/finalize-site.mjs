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
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LANGUAGES, SITE, SOURCE_LANGUAGE } from "./languages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

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

/**
 * What the build profile would have injected, read from the project itself.
 *
 * The builder ignores `include-in-head` and `include-after-body` on this
 * version — the pages came out without the structured data, the search widget
 * or the language switcher — so the same files are put in here instead.
 */
function injections(language) {
  try {
    return { head: readFileSync(join(ROOT, language.root, "head.html"), "utf8").trim() };
  } catch {
    return { head: "" };
  }
}

/**
 * The same page in the other languages, as a row of links.
 *
 * It goes at the top of the article, which puts it directly under the
 * breadcrumbs, and it is plain HTML: a reader with no JavaScript, and a crawler
 * that runs none, both still see every translation.
 */
function languageRow(language, page, present) {
  const links = present.map((other) =>
    other === language
      ? `<span aria-current="true" style="opacity:0.6">${other.name}</span>`
      : `<a href="${urlOf(other, page)}" hreflang="${other.code}">${other.name}</a>`
  );

  return `<nav class="asu-languages" aria-label="${language.strings.language}" style="margin:0 0 24px;font-size:13px;line-height:1.6;opacity:0.85">${links.join(' <span aria-hidden="true">·</span> ')}</nav>`;
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

    let html = readFileSync(path, "utf8");

    const at = html.indexOf("</head>");

    if (at === -1) {
      continue;
    }

    const injected = injections(language);

    if (injected.head && !html.includes("SoftwareSourceCode")) {
      html = `${html.slice(0, html.indexOf("</head>"))}${injected.head}\n${html.slice(html.indexOf("</head>"))}`;
    }

    if (!html.includes('rel="alternate" hreflang=')) {
      const canonical = `<link rel="canonical" href="${urlOf(language, page)}"/>`;

      html = `${html.slice(0, at)}    ${canonical}\n    ${alternates}\n    ${xDefault}\n${html.slice(at)}`;
      linked += 1;
    }

    // The builder renders the tag and leaves it empty, because the build
    // profile it would read the address from is not applied on this version.
    html = html.replace(
      /(<meta property="og:image" content=")("\s*\/?>)/,
      `$1${SITE}/images/banner-1280x640.jpg$2`
    );

    // Directly under the breadcrumbs, which sit above the article.
    if (!html.includes("asu-languages")) {
      const article = html.match(/<article[^>]*>/);

      if (article) {
        const at = html.indexOf(article[0]) + article[0].length;

        html = `${html.slice(0, at)}${languageRow(language, page, present)}${html.slice(at)}`;
      }
    }

    // Said once at the end of every page, in that page's language. It goes
    // inside the article: a paragraph left at the end of `body` is laid out by
    // the application's own grid and lands at the top of the page.
    if (!html.includes("asu-ai-notice")) {
      const notice = `<p class="asu-ai-notice" style="margin:40px 0 0;padding-top:16px;border-top:1px solid rgba(39,40,44,0.16);font-size:13px;line-height:1.5;opacity:0.7">${language.strings.aiNotice}</p>`;

      const article = html.lastIndexOf("</article>");

      const at = article === -1 ? html.lastIndexOf("</body>") : article;

      if (at !== -1) {
        html = `${html.slice(0, at)}${notice}\n${html.slice(at)}`;
      }
    }

    writeFileSync(path, html);
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
