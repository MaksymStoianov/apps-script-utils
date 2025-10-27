<a name="top"></a>

![Project banner for Google Apps Script Utils](docs/assets/images/banner-1280x640.jpg)

<p align="right">
  <i>Artist: <a href="https://darynamikhailenko.com/?utm_source=github&utm_medium=readme&utm_campaign=apps-script-utils&utm_content=banner-artist-credit" title="Portfolio of Daryna Mikhailenko, the artist">Daryna Mikhailenko</a></i>
</p>

# Utilities for Google Apps Script™ projects

[![Built%20with-clasp](https://img.shields.io/badge/Built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![License](https://img.shields.io/github/license/MaksymStoianov/apps-script-utils?label=License)](LICENSE)
[![Latest release](https://img.shields.io/github/v/release/MaksymStoianov/apps-script-utils?label=Release)](https://github.com/MaksymStoianov/apps-script-utils/releases)

[![GitHub Stars](https://img.shields.io/github/stars/MaksymStoianov/apps-script-utils?style=social)](https://github.com/MaksymStoianov/apps-script-utils/stargazers)
[![GitHub Fork](https://img.shields.io/github/forks/MaksymStoianov/apps-script-utils?style=social)](https://github.com/MaksymStoianov/apps-script-utils/forks)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/MaksymStoianov?style=social&logo=github)](https://github.com/sponsors/MaksymStoianov)

## Introduction

A set of utilities for **Google Apps Script**, as well as common functions for working with data, strings, validation
and
more. This project aims to simplify development in the Apps Script environment and provide frequently used functions in
one place.

## How to Install

To get started, install the dependencies:

```bash
npm install github:MaksymStoianov/apps-script-utils#main
```

> **Note:** It's recommended to use tags (`#vX.Y.Z`) for production environments to ensure version stability.

For example:

```bash
npm install github:MaksymStoianov/apps-script-utils#v1.6.0
```

## Functions by Category

### 1. Google Apps Script Module

Functions specifically designed for Google Apps Script environments, including utilities for working with spreadsheets.

<details open><summary>Functions</summary>

#### 1.1. Google Base Methods

Functions that enable various operations on a collection of base utility methods.

<details open><summary>Functions</summary>

| Function                                            | Description                            |
|:----------------------------------------------------|:---------------------------------------|
| [`getByteSize`](src/appsscript/base/getByteSize.ts) | Returns the size of a string in bytes. |

</details>

#### 1.2. Google Admin SDK Directory Methods

Functions that enable various operations on
the [Admin SDK Directory Service](https://developers.google.cn/apps-script/advanced/admin-sdk-directory).

#### 1.3. Google Drive Methods

Functions that enable various operations on Google Drive.

<details open><summary>Functions</summary>

| Function | Description |
|:---------|:------------|
|          |             |

</details>

#### 1.4. Google Docs Methods

Functions that enable various operations on Google Docs.

<details open><summary>Functions</summary>

| Function | Description |
|:---------|:------------|
|          |             |

</details>

#### 1.5. Google Forms Methods

Functions that enable various operations on Google Forms.

<details open><summary>Functions</summary>

| Function | Description |
|:---------|:------------|
|          |             |

</details>

#### 1.6. Google Sheets Methods

Functions that enable various operations on Google Sheets.

<details open><summary>Functions</summary>

| Function                                                                                      | Description                                                                                                                                   |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| [`appendColumn`](src/appsscript/sheet/appendColumn.ts)                                        | Appends a single column of data to the sheet.                                                                                                 |
| [`appendColumns`](src/appsscript/sheet/appendColumns.ts)                                      | Appends multiple columns of data to the sheet.                                                                                                |
| [`appendRow`](src/appsscript/sheet/appendRow.ts)                                              | Appends a single row of data to the sheet.                                                                                                    |
| [`appendRows`](src/appsscript/sheet/appendRows.ts)                                            | Appends multiple rows of data to the sheet.                                                                                                   |
| [`convertRichTextToHtml`](src/appsscript/sheet/convertRichTextToHtml.ts)                      | Converts a [`RichTextValue`](https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value) to an HTML string.              |
| [`doGridRangesIntersect`](src/appsscript/sheet/doGridRangesIntersect.ts)                      | Checks if two [`GridRange`](src/appsscript/sheet/types/GridRange.ts) objects intersect.                                                       |
| [`extractRangeFromA1Notation`](src/appsscript/sheet/extractRangeFromA1Notation.ts) 🆕         | Extracts the **range part** from a full A1 notation string (e.g., `'Sheet1!A1:B2'` returns `'A1:B2'`).                                        |
| [`extractSheetNameFromA1Notation`](src/appsscript/sheet/extractSheetNameFromA1Notation.ts) 🆕 | Extracts the sheet name from an A1 notation string (e.g., `Sheet1!A1:B2`).                                                                    |
| [`getColumnIndexByLetter`](src/appsscript/sheet/getColumnIndexByLetter.ts)                    | Gets the column index by its letter (e.g., 'A' -> 1).                                                                                         |
| [`getColumnLetterByIndex`](src/appsscript/sheet/getColumnLetterByIndex.ts)                    | Gets the column letter by its index (e.g., 1 -> 'A').                                                                                         |
| [`getColumnLetterByPosition`](src/appsscript/sheet/getColumnLetterByPosition.ts)              | Gets the column letter by its position.                                                                                                       |
| [`getColumnPositionByLetter`](src/appsscript/sheet/getColumnPositionByLetter.ts)              | Gets the column position by its letter.                                                                                                       |
| [`getSheetById`](src/appsscript/sheet/getSheetById.ts)                                        | Gets a sheet by its ID.                                                                                                                       |
| [`highlightHtml`](src/appsscript/sheet/highlightHtml.ts)                                      | Adds syntax highlighting to an HTML string.                                                                                                   |
| [`isCellGridRange`](src/appsscript/sheet/isCellGridRange.ts)                                  | Checks if a [`GridRange`](src/appsscript/sheet/types/GridRange.ts) represents a single cell.                                                  |
| [`isGridRangeContainedIn`](src/appsscript/sheet/isGridRangeContainedIn.ts)                    | Checks if one [`GridRange`](src/appsscript/sheet/types/GridRange.ts) is contained within another.                                             |
| [`isGridRangeSameDimensions`](src/appsscript/sheet/isGridRangeSameDimensions.ts)              | Checks if two [`GridRange`](src/appsscript/sheet/types/GridRange.ts) objects have the same dimensions.                                        |
| [`isRange`](src/appsscript/sheet/isRange.ts)                                                  | Checks if an object is a [`Range`](https://developers.google.com/apps-script/reference/document/range).                                       |
| [`isRichTextValue`](src/appsscript/sheet/isRichTextValue.ts)                                  | Checks if an object is a [`RichTextValue`](https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value).                  |
| [`isSheet`](src/appsscript/sheet/isSheet.ts)                                                  | Checks if an object is a [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).                                    |
| [`isSpreadsheet`](src/appsscript/sheet/isSpreadsheet.ts)                                      | Checks if an object is a [`Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet).                        |
| [`isTextStyle`](src/appsscript/sheet/isTextStyle.ts)                                          | Checks if an object is a [`TextStyle`](https://developers.google.com/apps-script/reference/slides/text-style).                                |
| [`isValidSheetId`](src/appsscript/sheet/isValidSheetId.ts)                                    | Checks if a sheet id is valid.                                                                                                                |
| [`isValidSheetName`](src/appsscript/sheet/isValidSheetName.ts)                                | Checks if a sheet name is valid.                                                                                                              |
| [`isValidSpreadsheetId`](src/appsscript/sheet/isValidSpreadsheetId.ts)                        | Checks if a spreadsheet ID is valid.                                                                                                          |
| [`nonRange`](src/appsscript/sheet/nonRange.ts)                                                | Checks if an object is not a [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range).                                |
| [`nonSheet`](src/appsscript/sheet/nonSheet.ts)                                                | Checks if an object is not a [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).                                |
| [`parseA1Notation`](src/appsscript/sheet/parseA1Notation.ts) 🆕                               | Parses an A1 notation (e.g., 'A1:B2') into [`GridRange`](src/appsscript/sheet/types/GridRange.ts) components.                                 |
| [`parseA1Notations`](src/appsscript/sheet/parseA1Notations.ts) 🆕                             | Parses a comma-separated string of A1 notations into an array of [`GridRange`](src/appsscript/sheet/types/GridRange.ts) objects.              |
| [`prependRow`](src/appsscript/sheet/prependRow.ts)                                            | Prepends a single row of data to the sheet.                                                                                                   |
| [`prependRows`](src/appsscript/sheet/prependRows.ts)                                          | Prepends multiple rows of data to the sheet.                                                                                                  |
| [`requireRange`](src/appsscript/sheet/requireRange.ts)                                        | Checks if an object is not a [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range), otherwise throws an exception. |
| [`requireSheet`](src/appsscript/sheet/requireSheet.ts)                                        | Checks if an object is not a [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet), otherwise throws an exception. |
| [`sortSheets`](src/appsscript/sheet/sortSheets.ts)                                            | Sorts all sheets in a spreadsheet alphabetically by name.                                                                                     |
| [`toA1Notation`](src/appsscript/sheet/toA1Notation.ts)                                        | Converts a [`GridRange`](src/appsscript/sheet/types/GridRange.ts) to A1 notation.                                                             |
| [`updateSheetNameInA1Notation`](src/appsscript/sheet/updateSheetNameInA1Notation.ts) 🆕       | Updates or sets the sheet name within an A1 notation string, while preserving the range information (e.g., `A1:B2`).                          |

</details>

#### 1.7. Google Slides Methods

Functions that enable various operations on Google Slides.

<details open><summary>Functions</summary>

| Function | Description |
|:---------|:------------|
|          |             |

</details>

#### 1.8. Google UI Methods

Functions that enable various operations on the user interface, including sidebars, dialogs, and web apps.

<details open><summary>Functions</summary>

| Function                                                            | Description                                                                                                       |
|:--------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------|
| [`checkMultipleAccount`](src/appsscript/ui/checkMultipleAccount.ts) | Checks if multiple Google accounts are in use.                                                                    |
| [`isHtmlOutput`](src/appsscript/ui/isHtmlOutput.ts)                 | Checks if an object is an [`HtmlOutput`](https://developers.google.com/apps-script/reference/html/html-output).   |
| [`isTextOutput`](src/appsscript/ui/isTextOutput.ts)                 | Checks if an object is a [`TextOutput`](https://developers.google.com/apps-script/reference/content/text-output). |
| [`isUi`](src/appsscript/ui/isUi.ts)                                 | Checks if an object is a [`Ui`](https://developers.google.com/apps-script/reference/base/ui).                     |

</details>

</details>

### 2. `Base Utilities

This package contains core utility functions that are not tied to a specific Apps Script service.

<details open><summary>Functions</summary>

| Function                                                            | Description                                                                                    |
|:--------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| [`chunk`](src/lang/array/chunk.ts)                                  | Splits an array into chunks of a specified size.                                               |
| [`decodeHtml`](src/html/decodeHtml.ts)                              | Decodes HTML entities.                                                                         |
| [`encodeHtml`](src/html/encodeHtml.ts)                              | Encodes a string for safe use in HTML.                                                         |
| [`escapeHtml`](src/html/escapeHtml.ts)                              | Escapes HTML special characters.                                                               |
| [`escapeRegExp`](src/lang/string/escapeRegExp.ts)                   | Escapes special characters for use in regular expressions.                                     |
| [`escapeXml`](src/html/escapeXml.ts)                                | Escapes XML special characters.                                                                |
| [`hashCode`](src/lang/object/hashCode.ts)                           | Calculates a hash code for a string.                                                           |
| [`is2DArray`](src/lang/array/is2DArray.ts)                          | Checks if a variable is a 2D array.                                                            |
| [`isArray`](src/lang/base/isArray.ts)                               | Checks if a variable is a `Array`.                                                             |
| [`isBoolean`](src/lang/base/isBoolean.ts)                           | Checks if a variable is a boolean value.                                                       |
| [`isConsistent2DArray`](src/lang/array/isConsistent2DArray.ts)      | Checks if a 2D array has consistent inner array lengths.                                       |
| [`isEmail`](src/lang/string/isEmail.ts)                             | Checks if a string is a valid email address.                                                   |
| [`isEmpty`](src/lang/base/isEmpty.ts)                               | Checks if a value is empty (for strings, arrays, objects).                                     |
| [`isException`](src/lang/base/isException.ts)                       | Checks if an object is an instance of `Exception` or its subclass.                             |
| [`isFunction`](src/lang/base/isFunction.ts)                         | Checks if a variable is a function.                                                            |
| [`isFunctionLike`](src/lang/base/isFunctionLike.ts)                 | Checks if a variable is a function in a broader sense.                                         |
| [`isLength`](src/lang/base/isLength.ts)                             | Checks if a value is "length-like" (arrays, strings, etc.).                                    |
| [`isNil`](src/lang/base/isNil.ts)                                   | Checks if a value is `null` or `undefined`.                                                    |
| [`isNull`](src/lang/base/isNull.ts)                                 | Checks if a value is `null`.                                                                   |
| [`isNumber`](src/lang/base/isNumber.ts)                             | Checks if a variable is a number.                                                              |
| [`isNumberLike`](src/lang/base/isNumberLike.ts)                     | Checks if a value can be converted to a number.                                                |
| [`isObject`](src/lang/base/isObject.ts)                             | Checks if a variable is an object (but not `null` or an array).                                |
| [`isObjectLike`](src/lang/base/isObjectLike.ts)                     | Checks if a variable is object-like (objects, arrays, functions).                              |
| [`isRegExp`](src/lang/base/isRegExp.ts)                             | Checks if a variable is a regular expression.                                                  |
| [`isScalar`](src/lang/base/isScalar.ts)                             | Checks if a variable is a scalar value (`string`, `number`, `boolean`, `symbol` and `bigint`). |
| [`isString`](src/lang/base/isString.ts)                             | Checks if a variable is a string.                                                              |
| [`isSymbol`](src/lang/base/isSymbol.ts)                             | Checks if a variable is a symbol.                                                              |
| [`isUndefined`](src/lang/base/isUndefined.ts)                       | Checks if a value is `undefined`.                                                              |
| [`isUrl`](src/net/url/isUrl.ts)                                     | Checks if a string is a valid URL.                                                             |
| [`isValidLocale`](src/lang/string/isValidLocale.ts)                 | Checks if a string is a valid locale code.                                                     |
| [`isValidSlug`](src/lang/string/isValidSlug.ts)                     | Checks if a string is a valid "slug" (URL-friendly string).                                    |
| [`isValidVersion`](src/lang/string/isValidVersion.ts)               | Checks if a string is a valid version number (semantic versioning).                            |
| [`isVersionCompatible`](src/lang/string/isVersionCompatible.ts)     | Checks version compatibility.                                                                  |
| [`nonArray`](src/lang/base/nonArray.ts)                             | Returns `true` if not `Array`.                                                                 |
| [`nonBoolean`](src/lang/base/nonBoolean.ts)                         | Returns `true` if not `boolean`.                                                               |
| [`nonEmpty`](src/lang/base/nonEmpty.ts)                             | Returns `true` if not "empty".                                                                 |
| [`nonFunction`](src/lang/base/nonFunction.ts) 🆕                    | Returns `true` if not `Function`.                                                              |
| [`nonNil`](src/lang/base/nonNil.ts)                                 | Returns `true` if not `null` or `undefined`.                                                   |
| [`nonNull`](src/lang/base/nonNull.ts)                               | Returns `true` if not `null`.                                                                  |
| [`nonNumber`](src/lang/base/nonNumber.ts)                           | Returns `true` if not a `number`.                                                              |
| [`nonScalar`](src/lang/base/nonScalar.ts)                           | Returns `true` if not a scalar value (`string`, `number`, `boolean`, `symbol` and `bigint`).   |
| [`nonString`](src/lang/base/nonString.ts)                           | Returns `true` if not a `string`.                                                              |
| [`nonSymbol`](src/lang/base/nonSymbol.ts)                           | Returns `true` if not a `Symbol`.                                                              |
| [`nonUndefined`](src/lang/base/nonUndefined.ts)                     | Returns `true` if not a `undefined`.                                                           |
| [`parseJson`](src/json/parseJson.ts)                                | Safely parses a JSON string.                                                                   |
| [`requireNonEmptyString`](src/lang/string/requireNonEmptyString.ts) | Checks if a string is non-empty, otherwise throws an exception.                                |
| [`requireNonNull`](src/lang/base/requireNonNull.ts)                 | Checks that a value is not `null`, otherwise throws an exception.                              |
| [`requireString`](src/lang/base/requireString.ts)                   | Checks that a value is a string, otherwise throws an exception.                                |
| [`requireValidEmail`](src/lang/string/requireValidEmail.ts)         | Checks that a string is a valid email, otherwise throws an exception.                          |
| [`stringifyJson`](src/json/stringifyJson.ts)                        | Safely converts an object to a JSON string.                                                    |
| [`toCamelCase`](src/lang/string/toCamelCase.ts)                     | Converts a string to camelCase.                                                                |
| [`toInteger`](src/lang/number/toInteger.ts)                         | Converts a value to an integer.                                                                |
| [`toKebabCase`](src/lang/string/toKebabCase.ts)                     | Converts a string to kebab-case.                                                               |
| [`toLowerCase`](src/lang/string/toLowerCase.ts)                     | Converts a string to lowercase.                                                                |
| [`toProperCase`](src/lang/string/toProperCase.ts)                   | Converts a string to Proper Case (first letter of each word capitalized).                      |
| [`toSnakeCase`](src/lang/string/toSnakeCase.ts)                     | Converts a string to snake_case.                                                               |
| [`toString`](src/lang/object/objectToString.ts)                     | Converts a value to a string.                                                                  |
| [`toUpperCase`](src/lang/string/toUpperCase.ts)                     | Converts a string to uppercase.                                                                |
| [`transpose`](src/lang/array/transpose.ts)                          | Transposes a 2D array (matrix).                                                                |
| [`versionCompare`](src/lang/string/versionCompare.ts)               | Compares two versions.                                                                         |

</details>

### 3. Exceptions Module

This package is for all exception classes.

<details open><summary>Functions</summary>

| Exception                                                                                  | Description                                                                                                                                       |
|:-------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| [`AdminDirectoryException`](src/exception/appsscript/admin/AdminDirectoryException.ts)     | Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.                                                  |
| [`InvalidGridRangeException`](src/exception/appsscript/sheet/InvalidGridRangeException.ts) | Represents an exception thrown when an invalid [`GridRange`](src/appsscript/sheet/types/GridRange.ts) object is provided.                         |
| [`InvalidRangeException`](src/exception/appsscript/sheet/InvalidRangeException.ts)         | Represents an exception thrown when an invalid [range](https://developers.google.com/apps-script/reference/spreadsheet/sheet) object is provided. |
| [`InvalidSheetException`](src/exception/appsscript/sheet/InvalidSheetException.ts)         | Represents an exception thrown when an invalid [sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet) object is provided. |

| Exception                                                                     | Description                                                                                     |
|:------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------|
| [`Exception`](src/exception/Exception.ts)                                     | Base exception class.                                                                           |
| [`RuntimeException`](src/exception/RuntimeException.ts)                       | Exception for runtime errors.                                                                   |
| [`EmptyStringException`](src/exception/EmptyStringException.ts)               | Exception for empty strings.                                                                    |
| [`IllegalArgumentException`](src/exception/IllegalArgumentException.ts)       | Exception for invalid arguments.                                                                |
| [`InvalidEmailFormatException`](src/exception/InvalidEmailFormatException.ts) | Exception for invalid email format.                                                             |
| [`InvalidStringException`](src/exception/InvalidStringException.ts)           | An exception thrown when a function expects a string, but receives a value of a different type. |
| [`NullPointerException`](src/exception/NullPointerException.ts)               | Exception for `null` values.                                                                    |

</details>

### 4. `path` Module

Functions for working with file paths and URLs.

<details open><summary>Functions</summary>

| Function                                         | Description                                                     |
|:-------------------------------------------------|:----------------------------------------------------------------|
| [`isAbsolute`](src/net/path/isAbsolute.ts)       | Checks if a path is absolute.                                   |
| [`isRelative`](src/net/path/isRelative.ts)       | Checks if a path is relative.                                   |
| [`isValidDomain`](src/net/path/isValidDomain.ts) | Checks if a string is a valid domain name.                      |
| [`join`](src/net/path/join.ts)                   | Joins multiple path segments.                                   |
| [`normalize`](src/net/path/normalize.ts)         | Normalizes a path, resolving `.` and `..`.                      |
| [`parse`](src/net/path/parse.ts)                 | Parses a path into its components (root, dir, base, ext, name). |

</details>

### 5. `abstracts` and `interfaces`

<details open><summary>Functions</summary>

| Abstract                     | Description |
|:-----------------------------|:------------|
| [`Class`](src/lang/Class.ts) |             |

</details>

<details open><summary>Functions</summary>

| Interface                          | Description              |
|:-----------------------------------|:-------------------------|
| [`Iterator`](src/lang/Iterator.ts) | Interface for iterators. |

</details>

## Tasks

<details><summary>More</summary>

- [ ] `appsscript/base/sprintf`
- [ ] `appsscript/base/formatDate`
- [ ] `appsscript/sheets/prependColumn`
- [ ] `appsscript/sheets/prependColumns`
- [ ] `appsscript/sheets/insertSchema`
- [ ] `appsscript/sheets/getSchema(sheet: Sheet)`
- [ ] `appsscript/sheets/removeSchema(sheet: Sheet)`
- [ ] `appsscript/sheets/getValues(sheet: Sheet, config: Object)`
- [ ] `appsscript/sheets/clearColumnsByConditional(sheet: Sheet, callback: Function)`
- [ ] `appsscript/sheets/clearRowsByConditional(sheet: Sheet, callback: Function)`
- [ ] `appsscript/sheets/deleteRowsByConditional(sheet: Sheet, callback: Function)`
- [ ] `appsscript/sheets/deleteColumnsByConditional(sheet: Sheet, callback: Function)`
- [ ] `appsscript/sheets/updateFormulas(sheet: Sheet)`
- [ ] `appsscript/sheets/getNamedRangeByName(name: string)`
- [ ] `appsscript/sheets/abstract/Sheet`
- [ ] `appsscript/sheets/abstract/Menu`
- [ ] `appsscript/net/abstract/URL`
- [ ] `appsscript/net/abstract/URLSearchParams`
- [ ] `appsscript/crypto/base64decode`
- [ ] `appsscript/crypto/base64encode`
- [ ] `appsscript/crypto/md5`
- [ ] `appsscript/crypto/sha1`
- [ ] `appsscript/crypto/sha256`
- [ ] `appsscript/crypto/sha512`
- [ ] `appsscript/dive/createFolder(path: string, rootFolder?: Folder)`
- [ ] `appsscript/classroom/getCourses()`
- [ ] `base/getTriggerById(id)`
- [ ] `base/flat(value: Array | Object, depth?: number)`
- [ ] `base/namespace(obj: Object | Array, path: string | number | Array)`
- [ ] `base/unique(arr: Array)`
- [ ] `base/first(arr: Array)`
- [ ] `base/last(arr: Array)`
- [ ] `base/compact(arr: Array)`
- [ ] `base/without(arr: Array, ...values: any)`
- [ ] `base/intersect(arr: Array)`
- [ ] `base/merge(text: string, fields: Object)` - Merges fields with text.
- [ ] `base/date/now`
- [ ] `base/date/diff`
- [ ] `base/date/getDaysInMonth`
- [ ] `base/date/getDaysLeftInMonth`
- [ ] `base/date/offset`
- [ ] `abstract/EventEmitter`

</details>

## Changelog

For a detailed list of changes and updates, please refer to the [CHANGELOG](CHANGELOG.md) file.

## License

This project is licensed under the [LICENSE](LICENSE) file.

---

⭐ **Like this project?** [Star our awesome repo »](https://github.com/MaksymStoianov/apps-script-utils)
