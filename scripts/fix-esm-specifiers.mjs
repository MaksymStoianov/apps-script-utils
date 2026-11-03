// SPDX-License-Identifier: Apache-2.0
/**
 * Rewrites extensionless relative import specifiers in the compiled output to fully specified ones,
 * so that `dist` can be loaded by Node.js ESM without a bundler:
 *
 * - `"./foo"` → `"./foo.js"` when `foo.js` (or `foo.d.ts` for declarations) exists;
 * - `"./bar"` → `"./bar/index.js"` when `bar` is a directory with an index file.
 *
 * Bundlers (Vite, Rollup, esbuild) accept both forms, so the Apps Script bundling is unaffected.
 *
 * Usage: `node scripts/fix-esm-specifiers.mjs [dir]` (default: `dist`).
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "dist");

/**
 * Matches relative specifiers in static imports/exports, side-effect imports and dynamic imports.
 * Group 1 is the opening part, group 2 the quote, group 3 the specifier.
 */
const SPECIFIER = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}\/[^"']*?)\2/g;

/**
 * Lists all `.js` and `.d.ts` files below a directory.
 *
 * @param {string} dir Directory to scan.
 * @returns {string[]} Absolute file paths.
 */
function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return listFiles(path);
    }

    return /\.(js|d\.ts)$/.test(entry.name) ? [path] : [];
  });
}

/**
 * Returns the fully specified form of a relative specifier, or the specifier unchanged.
 *
 * @param {string} fromFile File that contains the specifier.
 * @param {string} specifier Relative specifier, e.g. `./controller`.
 * @returns {string} Fully specified specifier, e.g. `./controller/index.js`.
 */
function fullySpecify(fromFile, specifier) {
  if (/\.(m?js|cjs|json)$/.test(specifier)) {
    return specifier;
  }

  const base = resolve(dirname(fromFile), specifier);

  const isDeclaration = fromFile.endsWith(".d.ts");

  const ext = isDeclaration ? ".d.ts" : ".js";

  if (existsSync(base + ext)) {
    return `${specifier}.js`;
  }

  const isDirectory = existsSync(base) && statSync(base).isDirectory();

  if (isDirectory && existsSync(join(base, `index${ext}`))) {
    const directory = specifier.replace(/\/$/, "");

    return `${directory}/index.js`;
  }

  return specifier;
}

if (!existsSync(root)) {
  console.error(`fix-esm-specifiers: ${root} does not exist`);
  process.exit(1);
}

let changed = 0;

const unresolved = [];

for (const file of listFiles(root)) {
  const source = readFileSync(file, "utf8");

  const output = source
    .split("\n")
    .map((line) =>
      // Leave comment lines alone: JSDoc examples contain imports of files that do not exist.
      /^\s*(\*|\/\/|\/\*)/.test(line)
        ? line
        : line.replace(SPECIFIER, (match, head, quote, specifier) => {
            const next = fullySpecify(file, specifier);

            if (next === specifier && !/\.(m?js|cjs|json)$/.test(specifier)) {
              unresolved.push(`${file}: ${specifier}`);
            }

            return `${head}${quote}${next}${quote}`;
          })
    )
    .join("\n");

  if (output !== source) {
    writeFileSync(file, output);
    changed++;
  }
}

if (unresolved.length > 0) {
  const list = unresolved.join("\n  ");

  console.error(`fix-esm-specifiers: unresolved relative specifiers:\n  ${list}`);
  process.exit(1);
}

console.log(`fix-esm-specifiers: updated ${changed} file(s) in ${root}`);
