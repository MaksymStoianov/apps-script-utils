<a name="top"></a>

![Project banner for Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artist: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

# Utilities for Google Apps Script™

<p align="left">
  <a href="https://www.npmjs.com/package/apps-script-utils"><img src="https://img.shields.io/npm/v/apps-script-utils?label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/apps-script-utils"><img src="https://img.shields.io/npm/dm/apps-script-utils?label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/Built%20with-clasp-4285f4.svg" alt="Built with clasp"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/MaksymStoianov/apps-script-utils?label=License" alt="License"></a>
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/Security-Policy-brightgreen.svg" alt="Security Policy"></a>
  <a href="https://github.com/users/MaksymStoianov/projects/2/views/2"><img src="https://img.shields.io/badge/Roadmap-Board-blue.svg" alt="Roadmap"></a>
  <a href="https://github.com/MaksymStoianov/apps-script-utils/releases"><img src="https://img.shields.io/github/v/release/MaksymStoianov/apps-script-utils?label=Release" alt="Latest release"></a>
</p>

<p align="left">
  <a href="https://github.com/MaksymStoianov/apps-script-utils/stargazers"><img src="https://img.shields.io/github/stars/MaksymStoianov/apps-script-utils?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/MaksymStoianov/apps-script-utils/forks"><img src="https://img.shields.io/github/forks/MaksymStoianov/apps-script-utils?style=social" alt="GitHub Fork"></a>
  <a href="https://github.com/sponsors/MaksymStoianov"><img src="https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github" alt="GitHub Sponsors"></a>
</p>

<!-- TOC -->

- [Utilities for Google Apps Script™ projects](#utilities-for-google-apps-script-projects)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [AI Agent Skills](#ai-agent-skills)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Documentation](#documentation)
  - [Usage Examples](#usage-examples)
  - [Development](#development)
    - [Scripts](#scripts)
    - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Functions by Category](#functions-by-category)
  - [Contributing](#contributing)
  - [Support](#support)
  - [Roadmap](#roadmap)
  - [Changelog](#changelog)
  - [License](#license)
  <!-- TOC -->

## Overview

**apps-script-utils** is a TypeScript utility library purpose-built for **Google Apps Script**. It brings together the
helpers every GAS project ends up writing by hand — spreadsheet and A1-notation manipulation, type/value validation
(`isX`/`nonX`/`requireX`), string and array transforms, typed exceptions, and more — in a single, well-documented, and
fully tested package.

## Key Features

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

## AI Agent Skills

For teams using an AI coding agent (Claude Code, Gemini CLI, and others), the
[bootgs/skills](https://github.com/bootgs/skills) repository provides an
[`apps-script-utils`](https://github.com/bootgs/skills/tree/main/skills/apps-script-utils) Agent Skill documenting
this library for such agents, including the `isX`/`nonX`/`requireX` validation convention, A1-notation and sheet
helpers, string/number/array helpers, typed exceptions, and the HTML/JSON/path helpers.

Install with Claude Code:

```bash
/plugin marketplace add bootgs/skills
/plugin install apps-script-utils@bootgs-skills
```

Install with the `npx skills` CLI, which supports multiple agents:

```bash
npx skills add bootgs/skills --skill apps-script-utils
```

Once installed, the agent applies the skill automatically when a task involves this library.

## Requirements

- [Node.js](https://nodejs.org/) v22.14.0 or later
- [npm](https://www.npmjs.com/) (or another Node package manager, e.g. pnpm)

## Installation

Install the package via npm:

```bash
npm install apps-script-utils
```

## Documentation

The full documentation is published at **<https://maksymstoianov.github.io/apps-script-utils/>** — guides, per-module
walkthroughs, and the complete function reference. Its source lives in [`docs/writerside/`](docs/writerside/) and is rebuilt on
every push to `main`.

A good order to read it in:

- [Getting started](https://maksymstoianov.github.io/apps-script-utils/getting-started.html)
- [Validation conventions](https://maksymstoianov.github.io/apps-script-utils/validation-conventions.html) — the
  `isX`/`nonX`/`requireX`/`requireNonX` naming scheme
- [Exception handling](https://maksymstoianov.github.io/apps-script-utils/exception-handling.html) — the class
  hierarchy and what raises each one
- [The Apps Script runtime](https://maksymstoianov.github.io/apps-script-utils/apps-script-runtime.html) — which
  helpers are bound to a Google service, and what that means for testing

## Usage Examples

### Working with Sheets

Append multiple rows of data efficiently:

```typescript
import { appendRows } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const data = [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
];

appendRows(sheet, data);
```

### Admin SDK Utilities

Check if the current user has administrative privileges:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1 Notation Parsing

Parse complex A1 notations into structured objects:

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Development

### Scripts

The following scripts are available in `package.json`:

| Script               | Description                                                     |
| :------------------- | :-------------------------------------------------------------- |
| `npm run build`      | Cleans the `dist` directory and compiles the TypeScript source. |
| `npm run dev`        | Starts Vitest in watch mode.                                    |
| `npm test`           | Runs the full test suite once.                                  |
| `npm run type:check` | Type-checks the project without emitting output.                |
| `npm run lint`       | Lints the codebase with ESLint.                                 |
| `npm run lint:fix`   | Lints the codebase and auto-fixes what it can.                  |
| `npm run format`     | Checks formatting with Prettier.                                |
| `npm run format:fix` | Formats the codebase with Prettier.                             |
| `npm run prepare`    | Sets up Husky git hooks (runs automatically after install).     |

### Testing

The project uses [Vitest](https://vitest.dev/) for unit testing.

Run the full suite once:

```bash
npm test
```

Or run it in watch mode while developing:

```bash
npm run dev
```

## Project Structure

```text
.
├── config/           # Configuration files
├── dist/             # Compiled output (after build)
├── docs/             # Documentation: assets and the Writerside source
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

## Functions by Category

The full function reference has moved to the documentation site, which is built from
[`docs/writerside/`](docs/writerside/) and published on every push to `main`:

**<https://maksymstoianov.github.io/apps-script-utils/>**

| Section                                                                                                   | Covers                                                                                       |
| :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| [Google Apps Script module](https://maksymstoianov.github.io/apps-script-utils/reference-appsscript.html) | Sheets, Slides, Admin SDK, Drive, Docs, Forms, network requests, and the built-in UI classes |
| [Base utilities](https://maksymstoianov.github.io/apps-script-utils/reference-base.html)                  | Type checking and validation, string, array, and object manipulation, JSON and HTML handling |
| [Exceptions](https://maksymstoianov.github.io/apps-script-utils/reference-exception.html)                 | The typed exception classes and what raises each one                                         |
| [`path` module](https://maksymstoianov.github.io/apps-script-utils/reference-path.html)                   | File paths and URLs                                                                          |
| [Abstracts and interfaces](https://maksymstoianov.github.io/apps-script-utils/reference-abstracts.html)   | Shared building blocks                                                                       |

Alongside the reference, the site carries the guides that the tables could not:
[validation conventions](https://maksymstoianov.github.io/apps-script-utils/validation-conventions.html) explains the
`isX`/`nonX`/`requireX`/`requireNonX` scheme in one place,
[exception handling](https://maksymstoianov.github.io/apps-script-utils/exception-handling.html) sets out the class
hierarchy, and [the Apps Script runtime](https://maksymstoianov.github.io/apps-script-utils/apps-script-runtime.html)
covers which helpers are bound to a Google service, what that costs, and what it means for testing.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the complete guide. In summary:

1. Fork the repository and create a branch for your feature or bug fix.
2. Add or update tests to cover your changes.
3. Run `npm run lint` and `npm run format` before committing.
4. Do not edit `CHANGELOG.md` by hand — it is generated automatically by [release-please](https://github.com/googleapis/release-please).
5. Open a pull request describing what changed and why.

Follow the existing code style and naming conventions. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community
guidelines.

## Support

- For bugs or feature requests, search or open an [issue](https://github.com/MaksymStoianov/apps-script-utils/issues)
  on GitHub.
- For recent changes, see the [Changelog](CHANGELOG.md).
- To report a security vulnerability, follow the [Security Policy](SECURITY.md) instead of opening a public issue.
- To support ongoing development, see [GitHub Sponsors](https://github.com/sponsors/MaksymStoianov).

## Roadmap

What is planned, in progress or done is on the [project board](https://github.com/users/MaksymStoianov/projects/2/views/2),
built from the issue tracker itself. There is no separate roadmap document to fall out of step with it: to propose
something, open an [issue](https://github.com/MaksymStoianov/apps-script-utils/issues).

## Changelog

For a detailed list of changes by version, see [CHANGELOG.md](CHANGELOG.md).

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

The banner artwork is not part of that licence. It is the work of its author, may be reused unmodified with the
author credited and the credit linked, and is covered by [docs/assets/images/README.md](docs/assets/images/README.md).

## Trademarks

Google Apps Script, Google Sheets, Google Slides, Google Docs, Google Forms and Google Drive are trademarks of
Google LLC. This project is an independent library. It is not affiliated with, endorsed by, or sponsored by Google
LLC, and the trademarks are used only to describe what the library works with.
