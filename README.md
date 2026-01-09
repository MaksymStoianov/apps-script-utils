<a name="top"></a>

![Project banner for Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
    <small>
        <i>Artist: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
    </small>
</p>

# Utilities for Google Apps Script™ projects

[![Built%20with-clasp](https://img.shields.io/badge/Built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![License](https://img.shields.io/github/license/MaksymStoianov/apps-script-utils?label=License)](LICENSE)
[![Latest release](https://img.shields.io/github/v/release/MaksymStoianov/apps-script-utils?label=Release)](https://github.com/MaksymStoianov/apps-script-utils/releases)

[![GitHub Stars](https://img.shields.io/github/stars/MaksymStoianov/apps-script-utils?style=social)](https://github.com/MaksymStoianov/apps-script-utils/stargazers)
[![GitHub Fork](https://img.shields.io/github/forks/MaksymStoianov/apps-script-utils?style=social)](https://github.com/MaksymStoianov/apps-script-utils/forks)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github)](https://github.com/sponsors/MaksymStoianov)

<!-- TOC -->

- [Utilities for Google Apps Script™ projects](#utilities-for-google-apps-script-projects)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Requirements](#requirements)
  - [How to Install](#how-to-install)
  - [Usage Examples](#usage-examples)
  - [Development](#development)
    - [Scripts](#scripts)
    - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Functions by Category](#functions-by-category)
    - [1. Google Apps Script Module](#1-google-apps-script-module)
      - [1.1. Google Base Methods](#11-google-base-methods)
      - [1.2. Google Admin SDK Directory Methods](#12-google-admin-sdk-directory-methods)
      - [1.3. Google Drive Methods](#13-google-drive-methods)
      - [1.4. Google Docs Methods](#14-google-docs-methods)
      - [1.5. Google Forms Methods](#15-google-forms-methods)
      - [1.6. Google Sheets Methods](#16-google-sheets-methods)
      - [1.7. Google Slides Methods](#17-google-slides-methods)
      - [1.8. Google UI Methods](#18-google-ui-methods)
    - [2. `Base` Utilities](#2-base-utilities)
    - [3. Exceptions Module](#3-exceptions-module)
    - [4. `path` Module](#4-path-module)
    - [5. `abstracts` and `interfaces`](#5-abstracts-and-interfaces)
  - [Contributing](#contributing)
  - [Support](#support)
  - [Roadmap](#roadmap)
  - [Changelog](#changelog)
  - [License](#license)
  <!-- TOC -->

## Overview

A set of utilities for **Google Apps Script**, as well as common functions for working with data, strings, validation
and
more. This project aims to simplify development in the Apps Script environment and provide frequently used functions in
one place.

## Key Features

- 🚀 **Optimized for GAS**: Tailored specifically for Google Apps Script environments and limitations.
- 🛠️ **Rich Utility Set**: Comprehensive collection of spreadsheet, UI, and admin SDK helpers.
- 📝 **TypeScript Support**: Full type definitions for better IDE support and safer code.
- 🧪 **Tested**: Unit tests using Vitest to ensure reliability.
- 🔗 **Linked Documentation**: Direct links to official Google documentation for all GAS types.
- 🛡️ **Robust Error Handling**: Custom exception classes for better debugging.

## Requirements

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)

## How to Install

To install the package from GitHub, run:

```bash
npm install github:MaksymStoianov/apps-script-utils#main
```

> **Note:** It's recommended to use tags (`#vX.Y.Z`) for production environments to ensure version stability.

For example:

```bash
npm install github:MaksymStoianov/apps-script-utils#v1.6.0
```

## Usage Examples

### 📊 Working with Sheets

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

### 🔐 Admin SDK Utilities

Check if the current user has administrative privileges:

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
} else {
  Logger.log("Access denied.");
}
```

### 📍 A1 Notation Parsing

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

- `npm run build`: Cleans the `dist` directory and compiles the TypeScript source.
- `npm run dev`: Starts Vitest in watch mode.
- `npm test`: Runs all tests once.
- `npm run lint`: Runs ESLint with auto-fix enabled.
- `npm run format`: Formats the codebase using Prettier.
- `npm run maint`: Runs the maintenance script (`scripts/maintenance.sh`).
- `npm run prepare`: Sets up Husky for git hooks.

### Testing

The project uses [Vitest](https://vitest.dev/) for testing. You can run tests using:

```bash
npm test
```

For development with watch mode:

```bash
npm run dev
```

## Project Structure

```text
.
├── config/           # Configuration files
├── dist/             # Compiled output (after build)
├── docs/             # Documentation and assets
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

### 1. Google Apps Script Module

Functions specifically designed for Google Apps Script environments, including utilities for working with spreadsheets.

<details open><summary>Functions</summary>

#### 1.1. Google Base Methods

Functions that enable various operations on a collection of base utility methods.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/appsscript/base/getByteSize.ts"><code>getByteSize</code></a></td>
            <td><code>Number</code></td>
            <td>Calculates the size of a string in bytes (UTF-8).</td>
        </tr>
    </tbody>
</table>

</details>

#### 1.2. Google Admin SDK Directory Methods

Functions that enable various operations on
the [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory).

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/appsscript/admin/isAdmin.ts"><code>isAdmin</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if the current user is an administrator of the Google Workspace domain.</td>
        </tr>
    </tbody>
</table>

</details>

#### 1.3. Google Drive Methods

Functions that enable various operations on Google Drive.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

</details>

#### 1.4. Google Docs Methods

Functions that enable various operations on Google Docs.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

</details>

#### 1.5. Google Forms Methods

Functions that enable various operations on Google Forms.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

</details>

#### 1.6. Google Sheets Methods

Functions that enable various operations on Google Sheets.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/appsscript/sheet/appendColumn.ts"><code>appendColumn</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Appends a single column of data to the right of the current data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/appendColumns.ts"><code>appendColumns</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Appends multiple columns of data to the right of the current data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/appendRow.ts"><code>appendRow</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Appends a single row of data to the bottom of the current data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/appendRows.ts"><code>appendRows</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Appends multiple rows of data to the bottom of the current data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/convertRichTextToHtml.ts"><code>convertRichTextToHtml</code></a></td>
            <td><code>String</code></td>
            <td>Converts a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> to its HTML representation.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/doGridRangesIntersect.ts"><code>doGridRangesIntersect</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if two <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> objects overlap on the same sheet.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/extractRangeFromA1Notation.ts"><code>extractRangeFromA1Notation</code></a> 🆕</td>
            <td><code>String | null</code></td>
            <td>Extracts the range part (e.g., <code>A1:B2</code>) from a full A1 notation string.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/extractSheetNameFromA1Notation.ts"><code>extractSheetNameFromA1Notation</code></a> </td>
            <td><code>String | null</code></td>
            <td>Extracts the sheet name part from an A1 notation string.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getColumnIndexByLetter.ts"><code>getColumnIndexByLetter</code></a></td>
            <td><code>Number | null</code></td>
            <td>Converts a column letter (e.g., <code>A</code>) to a 0-based column index.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getColumnLetterByIndex.ts"><code>getColumnLetterByIndex</code></a></td>
            <td><code>String</code></td>
            <td>Converts a 0-based column index to its letter representation (e.g., <code>0</code> -> <code>A</code>).</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getColumnLetterByPosition.ts"><code>getColumnLetterByPosition</code></a></td>
            <td><code>String</code></td>
            <td>Converts a 1-based column position to its letter representation.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getColumnPositionByLetter.ts"><code>getColumnPositionByLetter</code></a></td>
            <td><code>Number | null</code></td>
            <td>Converts a column letter to a 1-based column position.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getSheetById.ts"><code>getSheetById</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> | null</td>
            <td>Retrieves a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object by its unique ID.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/getSheetByIndex.ts"><code>getSheetByIndex</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> | null</td>
            <td>Retrieves a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object by its zero-based index.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/highlightHtml.ts"><code>highlightHtml</code></a></td>
            <td><code>String</code></td>
            <td>Applies syntax highlighting to an HTML string.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isCellGridRange.ts"><code>isCellGridRange</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> represents exactly one cell.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isGridRangeContainedIn.ts"><code>isGridRangeContainedIn</code></a></td>
            <td><code>Boolean</code></td>
            <td>Determines if one <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> is fully enclosed within another.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isGridRangeSameDimensions.ts"><code>isGridRangeSameDimensions</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if two <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> objects have identical height and width.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isRange.ts"><code>isRange</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isRichTextValue.ts"><code>isRichTextValue</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isSheet.ts"><code>isSheet</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isSpreadsheet.ts"><code>isSpreadsheet</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isTextStyle.ts"><code>isTextStyle</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isValidSheetId.ts"><code>isValidSheetId</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates the format of a sheet ID.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isValidSheetName.ts"><code>isValidSheetName</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string is a valid Google Sheets name.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/isValidSpreadsheetId.ts"><code>isValidSpreadsheetId</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates the format of a Google Spreadsheet ID.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/nonRange.ts"><code>nonRange</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/nonSheet.ts"><code>nonSheet</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/parseA1Notation.ts"><code>parseA1Notation</code></a> 🆕</td>
            <td><a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a></td>
            <td>Parses an A1 notation string into a structured <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/parseA1Notations.ts"><code>parseA1Notations</code></a> 🆕</td>
            <td><a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange[]</code></a></td>
            <td>Parses a list of comma-separated A1 notations into an array of <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> objects.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/prependRow.ts"><code>prependRow</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Inserts a single row of data at the top of the data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/prependRows.ts"><code>prependRows</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Inserts multiple rows of data at the top of the data area.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/requireRange.ts"><code>requireRange</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a></td>
            <td>Ensures a value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/requireSheet.ts"><code>requireSheet</code></a></td>
            <td><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a></td>
            <td>Ensures a value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/sortSheets.ts"><code>sortSheets</code></a></td>
            <td><code>void</code></td>
            <td>Alphabetically sorts all sheets within a spreadsheet.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/toA1Notation.ts"><code>toA1Notation</code></a></td>
            <td><code>String</code></td>
            <td>Converts a <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> object back to A1 notation.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/sheet/updateSheetNameInA1Notation.ts"><code>updateSheetNameInA1Notation</code></a> 🆕</td>
            <td><code>String</code></td>
            <td>Updates or sets the sheet name within an A1 notation string while preserving the range.</td>
        </tr>
    </tbody>
</table>

</details>

#### 1.7. Google Slides Methods

Functions that enable various operations on Google Slides.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

</details>

#### 1.8. Google UI Methods

Functions that enable various operations on the user interface, including sidebars, dialogs, and web apps.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/appsscript/ui/checkMultipleAccount.ts"><code>checkMultipleAccount</code></a></td>
            <td><code>Boolean</code></td>
            <td>Detects if the user is logged into multiple Google accounts simultaneously.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/ui/isHtmlOutput.ts"><code>isHtmlOutput</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/ui/isTextOutput.ts"><code>isTextOutput</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object.</td>
        </tr>
        <tr>
            <td><a href="src/appsscript/ui/isUi.ts"><code>isUi</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object.</td>
        </tr>
    </tbody>
</table>

</details>

</details>

### 2. `Base` Utilities

This package contains core utility functions that are not tied to a specific Apps Script service.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/lang/array/chunk.ts"><code>chunk</code></a></td>
            <td><code>Array</code></td>
            <td>Divides an array into multiple smaller arrays of a specified size.</td>
        </tr>
        <tr>
            <td><a href="src/html/decodeHtml.ts"><code>decodeHtml</code></a></td>
            <td><code>String</code></td>
            <td>Decodes HTML entities (e.g., <code>&amp;amp;</code> -> <code>&amp;</code>) back to plain text.</td>
        </tr>
        <tr>
            <td><a href="src/html/encodeHtml.ts"><code>encodeHtml</code></a></td>
            <td><code>String</code></td>
            <td>Encodes a string for safe rendering in HTML.</td>
        </tr>
        <tr>
            <td><a href="src/html/escapeHtml.ts"><code>escapeHtml</code></a></td>
            <td><code>String</code></td>
            <td>Escapes special characters (<code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, etc.) for HTML.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/escapeRegExp.ts"><code>escapeRegExp</code></a></td>
            <td><code>String</code></td>
            <td>Escapes special characters for safe use within regular expressions.</td>
        </tr>
        <tr>
            <td><a href="src/html/escapeXml.ts"><code>escapeXml</code></a></td>
            <td><code>String</code></td>
            <td>Escapes special characters for safe use in XML documents.</td>
        </tr>
        <tr>
            <td><a href="src/lang/object/hashCode.ts"><code>hashCode</code></a></td>
            <td><code>Number</code></td>
            <td>Generates a numeric hash code for a given string.</td>
        </tr>
        <tr>
            <td><a href="src/lang/array/is2DArray.ts"><code>is2DArray</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a two-dimensional array.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isArray.ts"><code>isArray</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is an <code>Array</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isBoolean.ts"><code>isBoolean</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a boolean.</td>
        </tr>
        <tr>
            <td><a href="src/lang/array/isConsistent2DArray.ts"><code>isConsistent2DArray</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a 2D array has uniform inner array lengths.</td>
        </tr>
        <tr>
            <td><a href="src/lang/number/isCountable.ts"><code>isCountable</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is a non-negative safe integer.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/isEmail.ts"><code>isEmail</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string follows a proper email format.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isEmpty.ts"><code>isEmpty</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is considered empty (null, undefined, empty string/array/object).</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isException.ts"><code>isException</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is an instance of <code>Exception</code> or a derived class.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isFunction.ts"><code>isFunction</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a function.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isFunctionLike.ts"><code>isFunctionLike</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is "function-like" (e.g., callable).</td>
        </tr>
        <tr>
            <td><a href="src/lang/number/isInteger.ts"><code>isInteger</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is a number and an integer.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isLength.ts"><code>isLength</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a valid array-like length.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isNil.ts"><code>isNil</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is <code>null</code> or <code>undefined</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isNull.ts"><code>isNull</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is <code>null</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isNumber.ts"><code>isNumber</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a number.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isNumberLike.ts"><code>isNumberLike</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value can be reliably converted to a number.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isObject.ts"><code>isObject</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a plain object (excluding null and arrays).</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isObjectLike.ts"><code>isObjectLike</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is an object (including arrays and functions).</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isRegExp.ts"><code>isRegExp</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a regular expression.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isScalar.ts"><code>isScalar</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is a primitive scalar type (string, number, boolean, symbol, bigint).</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isString.ts"><code>isString</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a string.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isSymbol.ts"><code>isSymbol</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a value is a symbol.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/isUndefined.ts"><code>isUndefined</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is <code>undefined</code>.</td>
        </tr>
        <tr>
            <td><a href="src/net/url/isUrl.ts"><code>isUrl</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string is a properly formatted URL.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/isValidLocale.ts"><code>isValidLocale</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string is a valid BCP 47 locale code.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/isValidSlug.ts"><code>isValidSlug</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string is a URL-friendly slug.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/isValidVersion.ts"><code>isValidVersion</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string follows Semantic Versioning rules.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/isVersionCompatible.ts"><code>isVersionCompatible</code></a></td>
            <td><code>Boolean</code></td>
            <td>Determines if two version strings are compatible based on SemVer.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonArray.ts"><code>nonArray</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT an <code>Array</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonBoolean.ts"><code>nonBoolean</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a boolean.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonEmpty.ts"><code>nonEmpty</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT empty.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonFunction.ts"><code>nonFunction</code></a> 🆕</td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a <code>Function</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonNil.ts"><code>nonNil</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT <code>null</code> or <code>undefined</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonNull.ts"><code>nonNull</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT <code>null</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/number/nonNegative.ts"><code>nonNegative</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is a non-negative number.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonNumber.ts"><code>nonNumber</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a number.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonScalar.ts"><code>nonScalar</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a scalar type.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonString.ts"><code>nonString</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a string.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonSymbol.ts"><code>nonSymbol</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT a <code>Symbol</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/nonUndefined.ts"><code>nonUndefined</code></a></td>
            <td><code>Boolean</code></td>
            <td>Checks if a value is NOT <code>undefined</code>.</td>
        </tr>
        <tr>
            <td><a href="src/time/now.ts"><code>now</code></a></td>
            <td><code>Number</code></td>
            <td>Returns the current timestamp in milliseconds.</td>
        </tr>
        <tr>
            <td><a href="src/lang/object/ObjectTag.ts"><code>ObjectTag</code></a></td>
            <td><code>Enum</code></td>
            <td>Enum representing <code>Object#toString</code> result references in uppercase.</td>
        </tr>
        <tr>
            <td><a href="src/json/parseJson.ts"><code>parseJson</code></a></td>
            <td><code>Object</code></td>
            <td>Safely parses a JSON string, handling potential errors.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/requireNonEmptyString.ts"><code>requireNonEmptyString</code></a></td>
            <td><code>String</code></td>
            <td>Ensures a string is not empty, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/requireNonNull.ts"><code>requireNonNull</code></a></td>
            <td><code>any</code></td>
            <td>Ensures a value is not <code>null</code>, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/lang/base/requireString.ts"><code>requireString</code></a></td>
            <td><code>String</code></td>
            <td>Ensures a value is a string, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/requireValidEmail.ts"><code>requireValidEmail</code></a></td>
            <td><code>String</code></td>
            <td>Ensures a string is a valid email, otherwise throws an exception.</td>
        </tr>
        <tr>
            <td><a href="src/json/stringifyJson.ts"><code>stringifyJson</code></a></td>
            <td><code>String</code></td>
            <td>Safely converts an object to a JSON string.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toCamelCase.ts"><code>toCamelCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to <code>camelCase</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/number/toInteger.ts"><code>toInteger</code></a></td>
            <td><code>Number | null</code></td>
            <td>Converts a value to an integer, returning <code>null</code> on failure.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toKebabCase.ts"><code>toKebabCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to <code>kebab-case</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toLowerCase.ts"><code>toLowerCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to lowercase.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toProperCase.ts"><code>toProperCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to Proper Case (capitalizing the first letter of each word).</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toSnakeCase.ts"><code>toSnakeCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to <code>snake_case</code>.</td>
        </tr>
        <tr>
            <td><a href="src/lang/object/objectToString.ts"><code>toString</code></a></td>
            <td><code>String</code></td>
            <td>Converts any value to its string representation.</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/toUpperCase.ts"><code>toUpperCase</code></a></td>
            <td><code>String</code></td>
            <td>Converts a string to uppercase.</td>
        </tr>
        <tr>
            <td><a href="src/lang/array/transpose.ts"><code>transpose</code></a></td>
            <td><code>Array</code></td>
            <td>Flips a 2D array over its diagonal (swaps rows and columns).</td>
        </tr>
        <tr>
            <td><a href="src/lang/string/versionCompare.ts"><code>versionCompare</code></a></td>
            <td><code>Number</code></td>
            <td>Compares two version strings, returning -1, 0, or 1.</td>
        </tr>
    </tbody>
</table>

</details>

### 3. Exceptions Module

This package is for all exception classes.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Exception</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/exception/appsscript/admin/AdminDirectoryException.ts"><code>AdminDirectoryException</code></a></td>
            <td>Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.</td>
        </tr>
        <tr>
            <td><a href="src/exception/appsscript/sheet/InvalidGridRangeException.ts"><code>InvalidGridRangeException</code></a></td>
            <td>Represents an exception thrown when an invalid <a href="src/appsscript/sheet/types/GridRange.ts"><code>GridRange</code></a> object is provided.</td>
        </tr>
        <tr>
            <td><a href="src/exception/appsscript/sheet/InvalidRangeException.ts"><code>InvalidRangeException</code></a></td>
            <td>Represents an exception thrown when an invalid <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object is provided.</td>
        </tr>
        <tr>
            <td><a href="src/exception/appsscript/sheet/InvalidSheetException.ts"><code>InvalidSheetException</code></a></td>
            <td>Represents an exception thrown when an invalid <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object is provided.</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>Exception</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/exception/Exception.ts"><code>Exception</code></a></td>
            <td>Base class for all custom exceptions.</td>
        </tr>
        <tr>
            <td><a href="src/exception/RuntimeException.ts"><code>RuntimeException</code></a></td>
            <td>Exception thrown during application execution.</td>
        </tr>
        <tr>
            <td><a href="src/exception/EmptyStringException.ts"><code>EmptyStringException</code></a></td>
            <td>Exception thrown when a non-empty string is required but an empty one is provided.</td>
        </tr>
        <tr>
            <td><a href="src/exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a></td>
            <td>Exception thrown when an invalid or inappropriate argument is passed to a method.</td>
        </tr>
        <tr>
            <td><a href="src/exception/InvalidEmailFormatException.ts"><code>InvalidEmailFormatException</code></a></td>
            <td>Exception thrown when an email address does not follow the expected format.</td>
        </tr>
        <tr>
            <td><a href="src/exception/InvalidStringException.ts"><code>InvalidStringException</code></a></td>
            <td>Exception thrown when a string is expected but another type is received.</td>
        </tr>
        <tr>
            <td><a href="src/exception/NullPointerException.ts"><code>NullPointerException</code></a></td>
            <td>Exception thrown when <code>null</code> is encountered where an object is required.</td>
        </tr>
    </tbody>
</table>

</details>

### 4. `path` Module

Functions for working with file paths and URLs.

<details open><summary>Functions</summary>

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Return type</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/net/path/isAbsolute.ts"><code>isAbsolute</code></a></td>
            <td><code>Boolean</code></td>
            <td>Determines if a given path is an absolute path.</td>
        </tr>
        <tr>
            <td><a href="src/net/path/isRelative.ts"><code>isRelative</code></a></td>
            <td><code>Boolean</code></td>
            <td>Determines if a given path is a relative path.</td>
        </tr>
        <tr>
            <td><a href="src/net/path/isValidDomain.ts"><code>isValidDomain</code></a></td>
            <td><code>Boolean</code></td>
            <td>Validates if a string is a properly formatted domain name.</td>
        </tr>
        <tr>
            <td><a href="src/net/path/join.ts"><code>join</code></a></td>
            <td><code>String</code></td>
            <td>Joins all given path segments together using the platform-specific separator.</td>
        </tr>
        <tr>
            <td><a href="src/net/path/normalize.ts"><code>normalize</code></a></td>
            <td><code>String</code></td>
            <td>Normalizes a path by resolving <code>.</code> and <code>..</code> segments.</td>
        </tr>
        <tr>
            <td><a href="src/net/path/parse.ts"><code>parse</code></a></td>
            <td><a href="src/net/path/types/ParsedPath.ts"><code>ParsedPath</code></a></td>
            <td>Breaks down a path into an object containing its constituent parts (root, dir, base, ext, name).</td>
        </tr>
    </tbody>
</table>

</details>

### 5. `abstracts` and `interfaces`

<details open><summary>Abstracts</summary>

<table>
    <thead>
        <tr>
            <th>Abstract</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/lang/Class.ts"><code>Class</code></a></td>
            <td>Base abstract class for providing common class functionality.</td>
        </tr>
    </tbody>
</table>

</details>

<details open><summary>Interfaces</summary>

<table>
    <thead>
        <tr>
            <th>Interface</th>
            <th>Brief description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="src/lang/Iterator.ts"><code>Iterator</code></a></td>
            <td>Interface for iterators.</td>
        </tr>
    </tbody>
</table>

</details>

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Write tests for your changes.
4. Run `npm run lint` and `npm run format`.
5. Submit a pull request.

Please make sure to follow the existing code style and naming conventions.

## Support

If you encounter any issues or have questions, please:

- Open an [issue](https://github.com/MaksymStoianov/apps-script-utils/issues) on GitHub.
- Check the [Changelog](CHANGELOG.md) for recent updates.
- Support the project by giving it a ⭐ on GitHub!

## Roadmap

For the project development plan and future features, please see the [ROADMAP](ROADMAP.md) file.

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG](CHANGELOG.md) file.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

⭐ **Like this project?** [Star our awesome repo »](https://github.com/MaksymStoianov/apps-script-utils)
