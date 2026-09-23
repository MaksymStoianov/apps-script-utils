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

export function writersideCfg(version) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ihp SYSTEM "https://resources.jetbrains.com/writerside/1.0/ihp.dtd">

<ihp version="2.0">
    <topics dir="topics" web-path="topics"/>
    <images dir="images" web-path="images"/>
    <snippets src="snippets"/>
    <instance src="asu.tree" version="${version}"/>
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

    <!-- The same settings again, scoped to the instance. Nothing configured
         here reached the published site — no canonicals, an empty og:image, and
         neither include — so both forms are declared until a build says which
         one this builder honours. Tracked in #539. -->
    <build-profile instance="asu">
        <variables>
${settings(language, 3)}
        </variables>
    </build-profile>

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
export function searchHtml(language) {
  const strings = language.strings;

  const roots = LANGUAGES.map((other) => ({
    code: other.code,
    name: other.name,
    url: other.webRoot,
    current: other.code === language.code
  }));

  return `<style>
  .asu-fab {
    position: fixed;
    bottom: 24px;
    z-index: 2147483000;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px 16px;
    border: 1px solid rgba(39, 40, 44, 0.16);
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 6px 20px rgba(39, 40, 44, 0.18);
    color: #27282c;
    font: 500 14px/1.2 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    cursor: pointer;
  }

  #asu-search-open {
    right: 24px;
  }

  #asu-language-open {
    right: 160px;
  }

  .asu-fab kbd {
    padding: 2px 6px;
    border: 1px solid rgba(39, 40, 44, 0.2);
    border-radius: 4px;
    font: 500 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    opacity: 0.7;
  }

  #asu-language-menu {
    position: fixed;
    right: 160px;
    bottom: 76px;
    z-index: 2147483000;
    display: none;
    min-width: 160px;
    padding: 6px;
    border: 1px solid rgba(39, 40, 44, 0.16);
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 12px 32px rgba(39, 40, 44, 0.22);
    font: 14px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }

  #asu-language-menu[open] {
    display: block;
  }

  #asu-language-menu a {
    display: block;
    padding: 8px 10px;
    border-radius: 6px;
    color: #27282c;
    text-decoration: none;
  }

  #asu-language-menu a:hover {
    background: rgba(48, 127, 255, 0.12);
  }

  #asu-language-menu a[aria-current="true"] {
    font-weight: 600;
  }

  #asu-search-dialog {
    position: fixed;
    inset: 0;
    z-index: 2147483001;
    display: none;
    padding: 10vh 16px 16px;
    background: rgba(19, 20, 22, 0.55);
  }

  #asu-search-dialog[open] {
    display: block;
  }

  #asu-search-panel {
    max-width: 680px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
    color: #27282c;
    font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }

  #asu-search-input {
    width: 100%;
    box-sizing: border-box;
    padding: 18px 20px;
    border: 0;
    border-bottom: 1px solid rgba(39, 40, 44, 0.12);
    background: transparent;
    color: inherit;
    font: 16px/1.4 inherit;
    outline: none;
  }

  #asu-search-results {
    max-height: 60vh;
    margin: 0;
    padding: 8px;
    overflow-y: auto;
    list-style: none;
  }

  #asu-search-results li a {
    display: block;
    padding: 10px 12px;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
  }

  #asu-search-results li[aria-selected="true"] a,
  #asu-search-results li a:hover {
    background: rgba(48, 127, 255, 0.12);
  }

  #asu-search-results .asu-title {
    font-weight: 600;
  }

  #asu-search-results .asu-snippet {
    margin-top: 2px;
    opacity: 0.75;
    font-size: 13px;
  }

  #asu-search-results mark {
    padding: 0 1px;
    border-radius: 2px;
    background: rgba(255, 214, 0, 0.45);
    color: inherit;
  }

  #asu-search-status {
    padding: 14px 20px;
    opacity: 0.7;
  }

  @media (max-width: 640px) {
    #asu-language-open {
      right: 24px;
      bottom: 76px;
    }

    #asu-language-menu {
      right: 24px;
      bottom: 128px;
    }
  }

  @media (prefers-color-scheme: dark) {
    .asu-fab,
    #asu-language-menu,
    #asu-search-panel {
      border-color: rgba(255, 255, 255, 0.16);
      background: #1e1f22;
      color: #dfe1e5;
    }

    #asu-language-menu a {
      color: #dfe1e5;
    }

    #asu-search-input {
      border-bottom-color: rgba(255, 255, 255, 0.12);
    }
  }

  html[data-theme="dark"] .asu-fab,
  html[data-theme="dark"] #asu-language-menu,
  html[data-theme="dark"] #asu-search-panel {
    border-color: rgba(255, 255, 255, 0.16);
    background: #1e1f22;
    color: #dfe1e5;
  }

  html[data-theme="dark"] #asu-language-menu a {
    color: #dfe1e5;
  }

  @media print {
    .asu-fab,
    #asu-language-menu,
    #asu-search-dialog {
      display: none !important;
    }
  }
</style>

<button id="asu-language-open" class="asu-fab" type="button" aria-haspopup="true" aria-expanded="false">
  <span aria-hidden="true">🌐</span> ${language.name}
</button>

<nav id="asu-language-menu" aria-label="${strings.language}">
${roots
  .map(
    (root) =>
      `  <a href="${root.url}/" hreflang="${root.code}"${root.current ? ' aria-current="true"' : ""}>${root.name}</a>`
  )
  .join("\n")}
</nav>

<button id="asu-search-open" class="asu-fab" type="button" aria-label="${strings.searchLabel}">
  <span aria-hidden="true">🔍</span> ${strings.searchLabel} <kbd>/</kbd>
</button>

<div id="asu-search-dialog" role="dialog" aria-modal="true" aria-label="${strings.searchLabel}">
  <div id="asu-search-panel">
    <input
      id="asu-search-input"
      type="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="${strings.searchPlaceholder}"
      aria-controls="asu-search-results"
    />
    <p id="asu-search-status">${strings.searchHint}</p>
    <ul id="asu-search-results" role="listbox"></ul>
  </div>
</div>

<script>
${widget(language)}
</script>
`;
}
