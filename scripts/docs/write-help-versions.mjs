/**
 * Writes `help-versions.json`, the file the version switcher in the site header
 * reads.
 *
 * The shape is JetBrains': a list of `{version, url, isCurrent}`, the urls
 * relative to the domain root. The current version is served at the site root
 * and every other one under a directory named after it, which is what the
 * deploy leaves in place before this runs.
 *
 * Usage: `node scripts/docs/write-help-versions.mjs <site-directory> <version>`
 */

import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "./languages.mjs";

const [dir, current] = process.argv.slice(2);

if (!dir || !current) {
  console.error("Usage: node scripts/docs/write-help-versions.mjs <site-directory> <version>");
  process.exit(1);
}

// `https://owner.github.io/apps-script-utils` → `/apps-script-utils`
const base = new URL(SITE).pathname.replace(/\/$/, "");

const archived = readdirSync(dir)
  .filter((entry) => /^\d+\.\d+\.\d+$/.test(entry))
  .filter((entry) => statSync(join(dir, entry)).isDirectory())
  .filter((entry) => entry !== current);

// Newest first, the way a switcher is read.
const order = (a, b) => {
  const left = a.split(".").map(Number);

  const right = b.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (left[i] !== right[i]) {
      return right[i] - left[i];
    }
  }

  return 0;
};

const versions = [
  { version: current, url: `${base}/`, isCurrent: true },
  ...archived.sort(order).map((version) => ({
    version,
    url: `${base}/${version}/`,
    isCurrent: false
  }))
];

writeFileSync(join(dir, "help-versions.json"), `${JSON.stringify(versions, null, 2)}\n`);

console.log(
  `help-versions.json: ${versions.length} version(s) — ${versions.map((entry) => entry.version).join(", ")}`
);
