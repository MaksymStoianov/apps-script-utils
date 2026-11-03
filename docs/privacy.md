# Privacy

**@bootgs/utils collects no data.**

- The library makes **no network calls of its own**: it does not use `UrlFetchApp`, `fetch` or any other HTTP
  client, and it contacts no server — neither the maintainers' nor a third party's.
- It contains **no telemetry**, analytics, tracking or "phone home" code.
- It runs entirely inside your Google Apps Script project. Spreadsheet, document and user data that your code passes
  to it, or that it reads on your behalf, stay in your project and the Google services your script already uses.
- The Apps Script services it calls are the ones a function exists to work with: for example `SpreadsheetApp` for
  the sheet helpers, `DriveApp` for the Drive helpers, the Admin SDK Directory service (`AdminDirectory`) for
  `isAdmin`, and `Session` to read the active user's email. Each function, its services and the OAuth scope it
  needs are listed on the
  [Apps Script runtime](https://bootgs.github.io/utils/apps-script-runtime.html) page.

Your own code, other libraries you add and Google's services are governed by their own terms and privacy
policies, for example the [Google Privacy Policy](https://policies.google.com/privacy).

Installing the package from npm is subject to the
[npm privacy policy](https://docs.npmjs.com/policies/privacy); the project receives only the aggregate download
counts that npm publishes.

Questions: open an [issue](https://github.com/bootgs/utils/issues) or see [SUPPORT.md](../SUPPORT.md).
