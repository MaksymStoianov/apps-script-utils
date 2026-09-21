/**
 * Concatenates the compiled modules into a single Apps Script file.
 *
 * Apps Script shares one global scope across the files of a project and
 * rejects ESM syntax outright, so the module wrappers have to go. Stripping
 * them is only half the job: the order the modules end up in decides whether
 * every top-level binding is initialised before the module that reads it.
 *
 * Usage: node scripts/gas/bundle.mjs [outfile]
 */

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const DIST = join(ROOT, "dist");

const OUT = process.argv[2] ?? join(ROOT, "gas", "Library.js");

const IMPORT = /^import\s+[^'"]*from\s*["']([^"']+)["'];?[ \t]*$/gm;

const BARE = /^import\s+["'][^"']+["'];?[ \t]*$/gm;

const EXPORT_FROM = /^export\s+\*\s+from\s+["'][^"']+["'];?[ \t]*$/gm;

const EXPORT_LIST_FROM = /^export\s*\{[^}]*\}\s*from\s*["'][^"']+["'];?[ \t]*$/gm;

const EXPORT_LIST = /^export\s*\{[^}]*\};?[ \t]*$/gm;

const EXPORT_KW = /^export (?=(?:default )?(?:async )?(?:class|function|const|let|var|enum))/gm;

const FROM_ANY = /from\s+["']([^"']+)["']/g;

function exists(path) {
  try {
    statSync(path);

    return true;
  } catch {
    return false;
  }
}

function walk(dir) {
  const out = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.name.endsWith(".js")) {
      out.push(full);
    }
  }

  return out;
}

if (!exists(DIST)) {
  console.error("dist/ is missing — run `npm run build` first.");
  process.exit(1);
}

// index.js files are pure re-exports; nothing of theirs survives the strip.
const files = walk(DIST)
  .filter((p) => !p.endsWith(`${sep}index.js`))
  .sort();

/**
 * Maps an import specifier to the emitted files it actually pulls in.
 */
function resolveSpec(src, spec) {
  if (!spec.startsWith(".")) {
    return [];
  }

  const target = resolve(dirname(src), spec);

  const direct = `${target}.js`;

  if (exists(direct)) {
    return [direct];
  }

  const barrel = join(target, "index.js");

  if (!exists(barrel)) {
    return [];
  }

  const out = [];

  const seen = new Set();

  const stack = [barrel];

  while (stack.length > 0) {
    const current = stack.pop();

    if (seen.has(current)) {
      continue;
    }

    seen.add(current);

    for (const match of readFileSync(current, "utf8").matchAll(FROM_ANY)) {
      const next = resolve(dirname(current), match[1]);

      if (exists(`${next}.js`)) {
        out.push(`${next}.js`);
      } else if (exists(join(next, "index.js"))) {
        stack.push(join(next, "index.js"));
      }
    }
  }

  return out;
}

const deps = new Map(files.map((p) => [p, new Set()]));

for (const file of files) {
  for (const match of readFileSync(file, "utf8").matchAll(IMPORT)) {
    for (const dep of resolveSpec(file, match[1])) {
      if (deps.has(dep) && dep !== file) {
        deps.get(file).add(dep);
      }
    }
  }
}

// Depth-first topological order. The barrels make the graph cyclic, so a
// revisit is ignored rather than treated as an error; function declarations
// hoist, which keeps a broken edge harmless for everything but classes.
const order = [];

const state = new Map();

function visit(file) {
  if (state.has(file)) {
    return;
  }

  state.set(file, 1);

  for (const dep of [...deps.get(file)].sort()) {
    visit(dep);
  }

  state.set(file, 2);
  order.push(file);
}

files.forEach(visit);

const chunks = order
  .map((file) => {
    const body = readFileSync(file, "utf8")
      .replace(IMPORT, "")
      .replace(BARE, "")
      .replace(EXPORT_FROM, "")
      .replace(EXPORT_LIST_FROM, "")
      .replace(EXPORT_LIST, "")
      .replace(EXPORT_KW, "")
      .trim();

    return body === "" ? null : { file, body };
  })
  .filter(Boolean);

// `class X extends Y` is the one construct that must see its base at load
// time, and it is exactly what the cyclic barrels get wrong. Reorder on the
// inheritance relation directly rather than trusting the import graph.
const DECL = /^class\s+([A-Za-z0-9_$]+)/gm;

const EXT = /^class\s+[A-Za-z0-9_$]+\s+extends\s+([A-Za-z0-9_$]+)/gm;

const declares = chunks.map((c) => new Set([...c.body.matchAll(DECL)].map((m) => m[1])));

const extend = chunks.map((c) => new Set([...c.body.matchAll(EXT)].map((m) => m[1])));

function ownerIndex(name) {
  return declares.findIndex((names) => names.has(name));
}

let settled = false;

for (let pass = 0; pass <= chunks.length && !settled; pass++) {
  settled = true;

  outer: for (let i = 0; i < chunks.length; i++) {
    for (const base of extend[i]) {
      const j = ownerIndex(base);

      if (j === -1 || j < i) {
        continue;
      }

      chunks.splice(i, 0, chunks.splice(j, 1)[0]);
      declares.splice(i, 0, declares.splice(j, 1)[0]);
      extend.splice(i, 0, extend.splice(j, 1)[0]);
      settled = false;

      break outer;
    }
  }
}

if (!settled) {
  console.error("could not order the class hierarchy.");
  process.exit(1);
}

const banner = [
  "/**",
  " * apps-script-utils — generated bundle, do not edit.",
  " *",
  " * Produced by scripts/gas/bundle.mjs from dist/. Apps Script has no module",
  " * system, so every module is inlined here in dependency order.",
  " */"
].join("\n");

const body = chunks
  .map((chunk) => {
    const name = relative(DIST, chunk.file);

    return `// ===== ${name} =====\n${chunk.body}`;
  })
  .join("\n\n");

const text = `${banner}\n\n${body}\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, text);

const count = chunks.length;

const target = relative(ROOT, OUT);

const size = text.length;

console.log(`${count} modules -> ${target} (${size} bytes)`);
