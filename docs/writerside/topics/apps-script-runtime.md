# The Apps Script runtime

<link-summary>Which functions need the Apps Script runtime and which run anywhere.</link-summary>

<web-summary>Which parts of @bootgs/utils depend on Google Apps Script services and which run in Node.js or a test suite, and what that means for testing your code.</web-summary>

The library is one package, but its functions do not all run in the same places. Knowing which side of the line a
function sits on decides whether you can unit test it, and whether it costs a service call.

## Two kinds of function

**Runtime-independent** functions are ordinary JavaScript. They take values, return values, and never reach for a
global. Everything in `lang`, `net`, `json`, `html`, `time`, and `exception` is in this group, and so are the parts
of `appsscript` that only transform strings and plain objects — the A1-notation parsers, the column-letter
conversions, and the `GridRange` comparisons.

**Service-bound** functions reach for a global service on their own. They only work inside a script that has the
relevant scope authorised, and they cannot be called in Node at all. Today that is the whole list:

| Function                              | Global it reaches for                                                | Scope it needs                                    |
| :------------------------------------ | :------------------------------------------------------------------- | :------------------------------------------------ |
| `isAdmin`, `nonAdmin`, `requireAdmin` | `Session.getActiveUser`, `AdminDirectory.Users`                      | `userinfo.email`, `admin.directory.user.readonly` |
| `checkMultipleAccount`                | `Session.getEffectiveUser`                                           | `userinfo.email`                                  |
| `getSheetById`, `getSheetByIndex`     | `SpreadsheetApp.getActiveSpreadsheet`, when no spreadsheet is passed | `spreadsheets.currentonly`                        |
| `getSlideByIndex`, `getSlideIndex`    | `SlidesApp.getActivePresentation`, when no presentation is passed    | `presentations.currentonly`                       |
| `createFolder`                        | `DriveApp.getRootFolder`, when no parent folder is passed            | `drive`                                           |
| `getTriggerById`                      | `ScriptApp.getProjectTriggers`                                       | `script.scriptapp`                                |
| `appendRows`, `prependRows`           | `LockService.getDocumentLock`                                        | none for the lock                                 |
| `appendRow`, `prependRow`             | `LockService.getDocumentLock`, through the two above                 | none for the lock                                 |
| `appendColumns`, `prependColumns`     | `LockService.getDocumentLock`                                        | none for the lock                                 |
| `appendColumn`, `prependColumn`       | `LockService.getDocumentLock`, through the two above                 | none for the lock                                 |
| `highlightHtml`                       | `SpreadsheetApp.newTextStyle`, `SpreadsheetApp.newRichTextValue`     | none for the builders                             |
| `insertSchema`                        | `SpreadsheetApp.newDataValidation`                                   | none for the builder                              |
| `deleteRowsByConditional`             | `SpreadsheetApp.Dimension`                                           | none for the enum                                 |
| `deleteColumnsByConditional`          | `SpreadsheetApp.Dimension`                                           | none for the enum                                 |
| `convertRichTextToHtml`               | `Utilities.formatString`                                             | none                                              |
| `retry`                               | `Utilities.sleep`, when it exists                                    | none                                              |

Scopes are written without the `https://www.googleapis.com/auth/` prefix. "None" means the global itself needs no
authorisation; the sheet, range or folder the function is given still needs the scope of the service it came from,
as the next section explains.

Everything else in `appsscript` takes the service object it works on as an argument — `appendRows` writes to the
`Sheet` you hand it, `requireSheet` inspects the value it is given rather than fetching one. Those functions need a
live service object to do anything useful, but they never go looking for one, which is what makes them
substitutable in a test.

## OAuth scopes

Apps Script decides which scopes to ask for by scanning the code of the whole project, the library included. A
project that bundles the library can therefore ask the user for more than it actually uses. List the scopes in
`appsscript.json` yourself instead: once `oauthScopes` is present, Apps Script asks for exactly those and nothing
else.

| What your code calls                                                                                                            | Narrowest scope                                   | Broader alternative                           |
| :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------ | :-------------------------------------------- |
| Any function that takes a `Sheet`, `Range`, `Spreadsheet` or `RichTextValue` from the bound spreadsheet                         | `spreadsheets.currentonly`                        | `spreadsheets`, for spreadsheets opened by ID |
| `getSheetById`, `getSheetByIndex` without a spreadsheet                                                                         | `spreadsheets.currentonly`                        | `spreadsheets`                                |
| Any function that takes a `Slide` or `Presentation`, and `getSlideByIndex`, `getSlideIndex` without one                         | `presentations.currentonly`                       | `presentations`                               |
| `createFolder`                                                                                                                  | `drive`                                           | —                                             |
| `getTriggerById`                                                                                                                | `script.scriptapp`                                | —                                             |
| `checkMultipleAccount`                                                                                                          | `userinfo.email`                                  | —                                             |
| `isAdmin`, `nonAdmin`, `requireAdmin`                                                                                           | `userinfo.email`, `admin.directory.user.readonly` | `admin.directory.user`                        |
| Everything in `lang`, `net`, `json`, `html`, `time` and `exception`, and the A1-notation, column-letter and `GridRange` helpers | none                                              | —                                             |

A container-bound script that works only on its own spreadsheet needs nothing more than this:

```json
{
  "timeZone": "Etc/UTC",
  "runtimeVersion": "V8",
  "oauthScopes": ["https://www.googleapis.com/auth/spreadsheets.currentonly"]
}
```

Things to know before narrowing:

- **`*.currentonly`** covers only the document the script is bound to, or the one an add-on runs in. A script that
  opens other spreadsheets or presentations by ID or URL needs `spreadsheets` or `presentations`.
- **`createFolder`** looks up existing folders by name before it creates one. Under `drive.file` a script sees only
  the files and folders it created or the user opened with it, so the lookup misses folders made by anyone else and
  creates duplicates. Use `drive.file` only when the whole tree is created by the script itself; otherwise `drive`.
- **The Admin SDK functions** also need the Admin SDK Directory advanced service enabled in the project
  (`dependencies.enabledAdvancedServices`, `serviceId` `admin`, `version` `directory_v1`), and a user who is allowed
  to read the directory. The read-only scope `admin.directory.user.readonly` is enough: `isAdmin` only reads the
  user.
- **A missing scope** shows up at run time, as an authorisation error from the service call, not when the project is
  saved. Run each code path once after you change `oauthScopes`.

The scope each method needs is listed under "Authorization" in its
[Apps Script reference](https://developers.google.com/apps-script/reference) page.

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
import { IllegalArgumentException, appendRows, isConsistent2DArray } from "@bootgs/utils";

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
