# Getting started

<link-summary>Requirements, installation, and a first working script.</link-summary>

<web-summary>Install apps-script-utils in a Google Apps Script project — npm package, clasp setup, and a first script that reads a sheet with the library.</web-summary>

## Requirements

- [Node.js](https://nodejs.org/) v22.14.0 or later
- [npm](https://www.npmjs.com/) (or another Node package manager, e.g. pnpm)

## Installation

```bash
npm install apps-script-utils
```

Everything is exported from the package root, so a single import path covers the whole library:

```typescript
import { appendRows, isAdmin, parseA1Notation, requireString } from "apps-script-utils";
```

## First examples

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

### Admin SDK utilities

Check if the current user has administrative privileges:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### A1 notation parsing

Parse complex A1 notations into structured objects:

```typescript
import { parseA1Notation } from "apps-script-utils";

const rangeInfo = parseA1Notation("'Sheet1'!A1:B10");

console.log(rangeInfo.sheetName); // "Sheet1"
console.log(rangeInfo.startRowIndex); // 0
console.log(rangeInfo.endColumnIndex); // 2
```

## Validating input

Most functions in the library reject bad input rather than coercing it. The `requireX` family turns an unchecked
value into a typed one, or throws:

```typescript
import { requireString, requireNonEmptyString } from "apps-script-utils";

function greet(name: unknown): string {
  return `Hello, ${requireNonEmptyString(name)}!`;
}

greet("Ada"); // "Hello, Ada!"
greet(""); // throws EmptyStringException
greet(42); // throws InvalidStringException
```

[](validation-conventions.md) explains the full `isX` / `nonX` / `requireX` / `requireNonX` naming scheme, and
[](exception-handling.md) covers the exceptions these functions throw.

## Where to go next

- [](validation-conventions.md) — the naming convention that covers most of the library.
- [](apps-script-runtime.md) — which helpers need the Apps Script runtime, and what that means for testing.
- [](reference-base.md) — the full list of runtime-independent functions.
- [](reference-appsscript.md) — the full list of service-bound functions.
