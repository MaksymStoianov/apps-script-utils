/**
 * Writes prose files from a plain table of authored text.
 *
 * `scripts/docs/author-guards.mjs` covers the four guard families and
 * `scripts/docs/author-exceptions.mjs` the exception classes; everything else is
 * written out one function at a time, in `docs/content/authored/*.mjs`, and
 * assembled here. Example code is written once, in the `examples` array, and
 * every language reuses it — only the titles are translated.
 *
 * Usage: `node scripts/docs/author-batch.mjs`
 */

import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { LANGUAGES } from "./languages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const AUTHORED = join(ROOT, "docs/content/authored");

let written = 0;

let functions = 0;

for (const file of readdirSync(AUTHORED).sort()) {
  if (!file.endsWith(".mjs")) {
    continue;
  }

  const module = await import(pathToFileURL(join(AUTHORED, file)).href);

  // A file may export only helpers, as `_entry.mjs` does.
  for (const [name, entry] of Object.entries(module.FUNCTIONS ?? {})) {
    functions += 1;

    for (const language of LANGUAGES) {
      const text = entry[language.code];

      if (!text) {
        throw new Error(`${name}: no ${language.code} text`);
      }

      const examples = (entry.examples ?? []).map((example, position) => ({
        title: text.titles?.[position] ?? example.title ?? "",
        ...(language.code === "en" ? { body: example.body } : {})
      }));

      const content = {
        summary: text.summary,
        description: text.description,
        params: text.params ?? {},
        returns: text.returns ?? "",
        throws: text.throws ?? {},
        examples,
        seeAlso: (entry.seeAlso ?? []).map((related) => ({ name: related }))
      };

      const dir = join(ROOT, "docs/content", language.code, "functions");

      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, `${name}.json`), `${JSON.stringify(content, null, 2)}\n`);
      written += 1;
    }
  }
}

console.log(`${functions} functions · ${written} prose files written`);
