/**
 * Builds `search-index.json` for the search widget in `docs/writerside/search.html`.
 *
 * It reads the built site rather than the Markdown sources, so the URLs are the
 * ones the builder actually produced and the text is the text a reader sees.
 *
 * Usage: `node scripts/docs/build-search-index.mjs <site-directory>`
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2];

if (!root) {
  console.error("Usage: node scripts/docs/build-search-index.mjs <site-directory>");
  process.exit(1);
}

function listPages(dir) {
  const out = [];

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);

    if (statSync(full).isDirectory()) {
      // The builder keeps its assets and the llms.txt copies in their own folders.
      if (["_llms", "assets", "images", "webhelp-assets"].includes(entry)) {
        continue;
      }

      out.push(...listPages(full));

      continue;
    }

    if (entry.endsWith(".html")) {
      out.push(full);
    }
  }

  return out;
}

function attribute(html, pattern) {
  const match = html.match(pattern);

  return match ? match[1].trim() : "";
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

const index = [];

for (const page of listPages(root)) {
  const html = readFileSync(page, "utf8");

  const url = relative(root, page).split("\\").join("/");

  // The redirect stub the builder writes at the site root is not a page.
  if (/<meta[^>]+http-equiv=["']refresh/i.test(html)) {
    continue;
  }

  const rawTitle = attribute(html, /<title>([^<]*)<\/title>/i);

  const title = decode(rawTitle.replace(/\s*\|\s*apps-script-utils\s*$/i, "")).trim();

  if (!title) {
    continue;
  }

  const summary = decode(attribute(html, /<meta name="description" content="([^"]*)"/i));

  const body = html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  const text = decode(body).replace(/\s+/g, " ").trim().slice(0, 4000);

  index.push({ url, title, summary, text });
}

index.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

writeFileSync(join(root, "search-index.json"), JSON.stringify(index));

console.log(`search-index.json: ${index.length} pages`);
