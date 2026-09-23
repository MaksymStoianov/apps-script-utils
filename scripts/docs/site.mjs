/**
 * Builds the per-language Writerside projects.
 *
 * Only `docs/writerside/` (English) is edited by hand. Every other language
 * project is written by `scripts/docs/generate-topics.mjs` from these
 * templates, so a change to the build configuration, the search widget or the
 * language switcher is made once and lands in all five sites.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { LANGUAGES, SITE } from "./languages.mjs";

/**
 * The widget script, with this language's labels substituted in.
 */
function widget(language) {
  const source = readFileSync(
    fileURLToPath(new URL("./assets/search-widget.js", import.meta.url)),
    "utf8"
  );

  const strings = JSON.stringify({
    hint: language.strings.searchHint,
    missing: language.strings.searchMissing,
    matches: language.strings.searchMatches,
    empty: language.strings.searchEmpty
  });

  return source.replace("__ASU_STRINGS__", strings);
}

const ARTWORK =
  "https://darynamikhailenko.com/?utm_source=docs&amp;utm_medium=footer&amp;utm_campaign=apps-script-utils&amp;utm_content=banner-artist-credit";

/**
 * The version on the instance line carries the `x-release-please-version`
 * annotation, because `release-please` bumps `package.json` without knowing
 * that five generated files repeat the version it writes. The annotation is
 * what its generic updater looks for, so the release pull request rewrites
 * these configurations along with the version, and the check that compares the
 * generated files to the sources still passes once the release lands.
 */
export function writersideCfg(version) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ihp SYSTEM "https://resources.jetbrains.com/writerside/1.0/ihp.dtd">

<ihp version="2.0">
    <topics dir="topics" web-path="topics"/>
    <images dir="images" web-path="images"/>
    <snippets src="snippets"/>
    <instance src="asu.tree" version="${version}"/> <!-- x-release-please-version -->
</ihp>
`;
}

/**
 * The settings every profile carries, indented to sit at `depth` levels.
 */
function settings(language, depth = 2) {
  const pad = " ".repeat(depth * 4);

  return [
    `<web-root>${language.webRoot}</web-root>`,
    `<noindex-content>false</noindex-content>`,
    `<generate-canonicals>true</generate-canonicals>`,
    `<locale-code>${language.locale}</locale-code>`,
    `<product-web-url>https://github.com/MaksymStoianov/apps-script-utils</product-web-url>`,
    `<og-image>${SITE}/images/banner-1280x640.jpg</og-image>`,
    `<versions-switcher>${SITE}/help-versions.json</versions-switcher>`,
    `<include-in-head>head.html</include-in-head>`,
    `<include-after-body>search.html</include-after-body>`
  ]
    .map((line) => `${pad}${line}`)
    .join("\n");
}

export function buildProfiles(language) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE buildprofiles SYSTEM "https://resources.jetbrains.com/writerside/1.0/build-profiles.dtd">

<buildprofiles xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:noNamespaceSchemaLocation="https://resources.jetbrains.com/writerside/1.0/build-profiles.xsd">

    <variables>
${settings(language)}
    </variables>

    <footer>
        <notice>${language.strings.aiNotice}</notice>
        <copyright>2025–2026 Maksym Stoianov. Licensed under Apache-2.0.</copyright>
        <link href="https://github.com/MaksymStoianov/apps-script-utils">GitHub</link>
        <link href="https://www.npmjs.com/package/apps-script-utils">npm</link>
${LANGUAGES.map((other) => `        <link href="${other.webRoot}/">${other.name}</link>`).join("\n")}
        <link href="${ARTWORK}">Banner artwork: Daryna Mikhailenko</link>
    </footer>

    <sitemap priority="0.5" change-frequency="weekly"/>

    <llms-txt/>

</buildprofiles>
`;
}

/**
 * The `head` of every page: the structured description of the library.
 *
 * The `hreflang` alternates are not written here. They depend on which pages
 * exist in which language, which is only known once every build sits in one
 * directory, and `scripts/docs/finalize-site.mjs` puts them into the HTML as
 * served — a link added by a script would be invisible to every crawler that
 * does not run JavaScript.
 */
export function headHtml(language) {
  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": "apps-script-utils",
    "description": "A TypeScript utility library for Google Apps Script: spreadsheet and A1-notation helpers, isX/nonX/requireX validation, string, array and object transforms, and typed exceptions.",
    "url": "${language.webRoot}/",
    "codeRepository": "https://github.com/MaksymStoianov/apps-script-utils",
    "programmingLanguage": ["TypeScript", "JavaScript"],
    "runtimePlatform": "Google Apps Script",
    "license": "https://www.apache.org/licenses/LICENSE-2.0",
    "inLanguage": "${language.locale}",
    "author": {
      "@type": "Person",
      "name": "Maksym Stoianov"
    }
  }
</script>

`;
}

/**
 * The search widget and the language switcher, injected after the body of every
 * page. Writerside publishes no search of its own, and has no notion of a
 * translated site, so both live here.
 */
