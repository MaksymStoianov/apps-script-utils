# The Apps Script runtime

The library is one package, but its functions do not all run in the same places. Knowing which side of the line a
function sits on decides whether you can unit test it, and whether it costs a service call.

## Two kinds of function

**Runtime-independent** functions are ordinary JavaScript. They take values, return values, and never reach for a
global. Everything in `lang`, `net`, `json`, `html`, `time`, and `exception` is in this group, and so are the parts
of `appsscript` that only transform strings and plain objects — the A1-notation parsers, the column-letter
conversions, and the `GridRange` comparisons.

**Service-bound** functions reach for a global service on their own. They only work inside a script that has the
relevant scope authorised, and they cannot be called in Node at all. Today that is the whole list:

| Function                | Global it reaches for                                                |
| :---------------------- | :------------------------------------------------------------------- |
| `isAdmin`               | `Session.getActiveUser`, `AdminDirectory.Users`                      |
| `checkMultipleAccount`  | `Session.getEffectiveUser`                                           |
| `getSheetById`          | `SpreadsheetApp.getActiveSpreadsheet`, when no spreadsheet is passed |
| `getSheetByIndex`       | `SpreadsheetApp.getActiveSpreadsheet`, when no spreadsheet is passed |
| `highlightHtml`         | `SpreadsheetApp.newTextStyle`, `SpreadsheetApp.newRichTextValue`     |
| `convertRichTextToHtml` | `Utilities.formatString`                                             |

Everything else in `appsscript` takes the service object it works on as an argument — `appendRows` writes to the
`Sheet` you hand it, `requireSheet` inspects the value it is given rather than fetching one. Those functions need a
live service object to do anything useful, but they never go looking for one, which is what makes them
substitutable in a test.

## Batch at the boundary

Each service call is a round trip, and Apps Script counts them against the execution time limit. The write helpers
exist because of this: `appendRows` makes one call regardless of how many rows you pass, where a loop calling
`appendRow` makes one per row.

```typescript
// One service call.
appendRows(sheet, rows);

// One service call per row; avoid for anything but a single append.
for (const row of rows) {
  appendRow(sheet, row);
}
```

The same reasoning applies to validation. Check the shape of the data before it reaches the service, not after:

```typescript
import { IllegalArgumentException, appendRows, isConsistent2DArray } from "apps-script-utils";

if (!isConsistent2DArray(rows)) {
  throw new IllegalArgumentException("every row must have the same number of columns");
}

appendRows(sheet, rows);
```

`Range.setValues()` rejects a ragged array, but the failure arrives from the service without saying which row was
wrong. Checking first turns that into an error you control.

## Quotas

Apps Script enforces per-script and per-account quotas — execution time, calls to each service, triggers, URL fetches,
and more. The library does nothing to raise or track them; it only reduces how many calls you make. Two consequences
worth planning around:

- A function that is runtime-independent costs nothing but CPU. Move validation and transformation to that side of
  the line wherever you can.
- A service-bound function can fail for reasons that have nothing to do with its arguments. `isAdmin` throwing
  `AdminDirectoryException` means the Admin SDK advanced service is not enabled for the project — not that the user
  is not an administrator.

The current limits are published in
[Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas).

## Testing

The test suite runs under [Vitest](https://vitest.dev/) in Node, where none of the Apps Script globals exist. That
is why the split matters:

- **Runtime-independent functions are unit tested directly.** They are the bulk of `test/`, imported through the
  `@/` alias.
- **Service-bound functions are not.** Calling them in Node throws a `ReferenceError` for `SpreadsheetApp` or
  whichever global they reach for, so they are covered by hand against a real script project instead. The functions
  that merely take a `Sheet` sit in between: they can be exercised with a stand-in object shaped like the service
  class.

```bash
npm test        # run the suite once
npm run dev     # watch mode
```

When you add a function, this is the first design question: can it take the service object as a parameter instead of
fetching one? If it can, it becomes testable, and the caller keeps control of how many service calls happen.

## Writing for both

The library targets the V8 runtime. Two habits keep code working on both sides of the line:

- **Take service objects as arguments.** `appendRows(sheet, rows)` works anywhere a `Sheet` comes from; a function
  that calls `SpreadsheetApp.getActiveSpreadsheet()` internally only works in a bound script.
- **Keep the parsing separate from the fetching.** `parseA1Notation` is pure string work and runs in Node, which is
  why it is unit tested; `getSheetById` is the same lookup expressed against the active spreadsheet, and is not.
  Passing the spreadsheet explicitly — `getSheetById(id, spreadsheet)` — moves it back across the line.
