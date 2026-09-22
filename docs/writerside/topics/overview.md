# Overview

<link-summary>What apps-script-utils is, what it covers, and how this documentation is organised.</link-summary>

<web-summary>apps-script-utils is a TypeScript utility library for Google Apps Script: spreadsheet and A1-notation helpers, isX/nonX/requireX validation, and typed exceptions.</web-summary>

![Project banner for Google Apps Script Utils](banner-1280x640.jpg)

<p align="right"><small><i>Artist: <a href="https://darynamikhailenko.com/?utm_source=docs&amp;utm_medium=overview&amp;utm_campaign=apps-script-utils&amp;utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i></small></p>

**apps-script-utils** is a TypeScript utility library purpose-built for **Google Apps Script**. It brings together the
helpers every GAS project ends up writing by hand — spreadsheet and A1-notation manipulation, type/value validation
(`isX`/`nonX`/`requireX`), string and array transforms, typed exceptions, and more — in a single, well-documented, and
fully tested package.

## Key features

- **Built for Google Apps Script** — designed around the GAS runtime and its constraints, not adapted from a generic
  Node.js library.
- **Broad utility coverage** — spreadsheet, UI, network, and Admin SDK helpers alongside general-purpose string,
  array, and object utilities.
- **TypeScript-first** — every function ships with full type definitions for IDE autocompletion and compile-time
  safety.
- **Tested** — covered by a Vitest unit test suite.
- **Linked reference documentation** — every Google Apps Script type used in the API links directly to its official
  documentation.
- **Consistent error handling** — a dedicated hierarchy of exception classes replaces ad-hoc thrown errors.

## How this documentation is organised

- [](getting-started.md) — requirements, installation, and a first working script.
- **Guides** explain the ideas that run through the whole library:
  [](validation-conventions.md), [](exception-handling.md), and [](apps-script-runtime.md).
- **Modules** describe each package and show it in use: [](module-lang.md), [](module-appsscript.md),
  [](module-net.md), and [](module-exception.md).
- **Function reference** lists every exported function, grouped the way the package itself is grouped:
  [](reference-appsscript.md), [](reference-base.md), [](reference-exception.md), [](reference-path.md), and
  [](reference-abstracts.md). Every entry in those tables links to a page of its own — signature, parameters,
  return value, what it throws, and worked examples — and every exported function, class and type has one.
- [](ecosystem.md) — the boot.gs framework, which depends on this library, and the Agent Skills that teach an AI
  coding agent to use it.

Press <shortcut>/</shortcut> anywhere on this site to search it.

## Where the library runs

The package splits cleanly in two, and the split decides where a function can be called:

| Part                                               | Depends on the Apps Script runtime   | Where it runs                        |
| :------------------------------------------------- | :----------------------------------- | :----------------------------------- |
| `lang`, `net`, `json`, `html`, `time`, `exception` | No                                   | Apps Script, Node.js, the test suite |
| `appsscript`                                       | Yes, for the service-bound functions | Apps Script only                     |

[](apps-script-runtime.md) covers which functions fall on which side and what that means in practice.

## Project layout

```text
.
├── config/           # Configuration files
├── dist/             # Compiled output (after build)
├── docs/             # Documentation: assets and the source of this site
├── scripts/          # Maintenance and helper scripts
├── src/              # Source code
│   ├── appsscript/   # Google Apps Script specific utilities
│   ├── exception/    # Custom exception classes
│   ├── html/         # HTML utilities
│   ├── json/         # JSON utilities
│   ├── lang/         # Language-level utilities (array, string, etc.)
│   ├── net/          # Network and path utilities
│   ├── time/         # Time-related utilities
│   └── index.ts      # Main entry point
├── test/             # Unit tests
└── vitest.config.ts  # Vitest configuration
```
