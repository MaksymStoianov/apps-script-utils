# appsscript

<link-summary>The Google Apps Script helpers: spreadsheets, A1 notation, UI, Drive, and the Admin SDK.</link-summary>

<web-summary>The appsscript module of apps-script-utils: spreadsheet and A1-notation helpers, sheet validation, UI, Drive, Slides and Admin SDK utilities for Google Apps Script.</web-summary>

`appsscript` holds everything that touches a Google service. It is the part of the library that only runs inside the
Apps Script runtime — see [](apps-script-runtime.md) for what that means when testing.

## Packages

| Package                                                 | Covers                                                       |
| :------------------------------------------------------ | :----------------------------------------------------------- |
| `appsscript/base`                                       | general helpers shared by the service packages               |
| `appsscript/admin`                                      | the Admin SDK Directory Service                              |
| `appsscript/sheet`                                      | Sheets: rows, columns, A1 notation, `GridRange`, type guards |
| `appsscript/slide`                                      | Slides: slide lookup, text replacement, Markdown conversion  |
| `appsscript/net`                                        | request authentication                                       |
| `appsscript/ui`                                         | the built-in `Ui`, `HtmlOutput`, and `TextOutput` classes    |
| `appsscript/doc`, `appsscript/drive`, `appsscript/form` | reserved; not implemented yet                                |

## A1 notation

`parseA1Notation` turns a notation string into a `GridRange` — a plain object with zero-based, half-open bounds,
matching the Sheets API rather than the 1-based positions `Range` methods take:

```typescript
import { parseA1Notation } from "apps-script-utils";

parseA1Notation("Sheet1!A1:B10");
// {
//   sheetName: "Sheet1",
//   a1Notation: "A1:B10",
//   startRowIndex: 0,
//   endRowIndex: 10,
//   startColumnIndex: 0,
//   endColumnIndex: 2
// }

parseA1Notation("B5");
// { sheetName: null, a1Notation: "B5", startRowIndex: 4, endRowIndex: 5, ... }
```

Unbounded notations parse too — `"5:15"` leaves the column bounds unset, `"M:X"` leaves the row bounds unset.

`toA1Notation` is the inverse:

```typescript
import { toA1Notation } from "apps-script-utils";

toA1Notation({ startRowIndex: 0, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 2 });
// "A1:B10"
```

`parseA1Notations` takes a comma-separated list and returns one `GridRange` per entry:

```typescript
import { parseA1Notations } from "apps-script-utils";

parseA1Notations("Sheet1!A1:B2, Sheet1!D1"); // two GridRange objects
```

The sheet name can be read, replaced, or stripped without reparsing:

```typescript
import {
  extractRangeFromA1Notation,
  extractSheetNameFromA1Notation,
  updateSheetNameInA1Notation
} from "apps-script-utils";

extractSheetNameFromA1Notation("'My Sheet'!A1"); // "My Sheet"
extractRangeFromA1Notation("'My Sheet'!A1:B2"); // "A1:B2"
updateSheetNameInA1Notation("Sheet1!A1:B2", "Data"); // "Data!A1:B2"
```

## Columns

Two numbering schemes are in play, and the function names say which one they return. An _index_ is zero-based, as in
a `GridRange`; a _position_ is one-based, as in `Sheet.getRange()`:

```typescript
import {
  getColumnIndexByLetter,
  getColumnLetterByIndex,
  getColumnPositionByLetter
} from "apps-script-utils";

getColumnIndexByLetter("A"); // 0
getColumnIndexByLetter("AZ"); // 51
getColumnLetterByIndex(0); // "A"
getColumnLetterByIndex(51); // "AZ"
getColumnPositionByLetter("A"); // 1
```

## Comparing ranges

`GridRange` objects compare without a round trip to the service:

```typescript
import {
  doGridRangesIntersect,
  isCellGridRange,
  isGridRangeContainedIn,
  isGridRangeSameDimensions
} from "apps-script-utils";

const header = { startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 5 };
const body = { startRowIndex: 1, endRowIndex: 100, startColumnIndex: 0, endColumnIndex: 5 };

doGridRangesIntersect(header, body); // false
isCellGridRange(header); // false — it spans five columns
```

## Writing rows and columns

```typescript
import { appendRows, prependRows, appendColumns } from "apps-script-utils";

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

appendRows(sheet, [
  ["John Doe", "john@example.com", 28],
  ["Jane Smith", "jane@example.com", 32]
]);

prependRows(sheet, [["Name", "Email", "Age"]]);
```

These write in one call rather than row by row, which is the difference between one service round trip and one per
row. Every row must be the same length — `isConsistent2DArray` from [](module-lang.md) is the check to make first.

## Type guards for service objects

The same convention as the rest of the library, applied to Apps Script classes:

```typescript
import { isSheet, isSpreadsheet, isRange, requireSheet } from "apps-script-utils";

function rowCount(value: unknown): number {
  return requireSheet(value).getLastRow();
}
```

`requireSheet`, `requireSpreadsheet`, and `requireRange` throw `InvalidSheetException`,
`InvalidSpreadsheetException`, and `InvalidRangeException` respectively — see [](exception-handling.md).

## Slides

```typescript
import { getSlideByIndex, findReplaceAllTextInSlide, requireSlide } from "apps-script-utils";

const presentation = SlidesApp.getActivePresentation();

// getSlideByIndex returns null when the index is out of range, so pair it with
// requireSlide where a missing slide should stop the script.
const slide = requireSlide(getSlideByIndex(presentation, 0));

findReplaceAllTextInSlide(slide, "{{name}}", "Ada Lovelace");
```

`findReplaceAllTextInSlide` returns the number of replacements made and matches case by default; pass `false` as its
fourth argument for a case-insensitive search. `requireSlide` throws `SlideNotFoundException` when the value is not a
slide.

## Admin SDK

```typescript
import { isAdmin } from "apps-script-utils";

if (isAdmin()) {
  Logger.log("Access granted to admin panel.");
}
```

`isAdmin` answers `false` when the Admin SDK Directory Service is not enabled for the project, logging the reason
rather than throwing — which makes it safe to call while building a menu, but means a `false` does not by itself
prove the user is not an administrator. Enable the advanced service before relying on the answer.

## Full list

[](reference-appsscript.md) lists every function in this module with its return type and a link to its source.
