# Overview

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
  [](reference-abstracts.md).

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
