# Roadmap 🚀

This document outlines the planned development and future direction of the **apps-script-utils** library.

## Goals

- Provide a robust, well-typed set of utilities for Google Apps Script.
- Improve developer experience with better error handling and documentation.
- Maintain high performance and minimal overhead.

---

## Status Legend

- 🟢 **Completed**: Feature is implemented and released.
- 🟡 **In Progress**: Actively being worked on.
- 🔵 **Planned**: Scheduled for development in the near future.
- ⚪ **Future**: Ideas for long-term consideration.

---

## Milestones

### v1.x (Current - Strengthening the Core)

Focus on filling gaps in existing modules and improving the reliability of basic operations.

| Feature                                       | Category | Status |
| :-------------------------------------------- | :------- | :----: |
| Enhanced A1 Notation parsing and manipulation | Sheets   |   🟢   |
| Admin SDK helpers (`isAdmin`)                 | Admin    |   🟢   |
| Standardized Exception classes                | Core     |   🟢   |
| Google Slides utilities                       | Slides   |   🟢   |
| Network & Authentication helpers              | Net      |   🟢   |
| `prependColumn` / `prependColumns`            | Sheets   |   🔵   |
| `sprintf` and `formatDate` helpers            | Base     |   🔵   |
| Crypto utilities (MD5, SHA, Base64)           | Crypto   |   🔵   |
| Deprecation of `parseJson`                    | JSON     |   🟢   |

### v2.0 (The Modern Era)

Focus on higher-level abstractions and broader service support.

| Feature                                                        | Category | Status |
| :------------------------------------------------------------- | :------- | :----: |
| Native `URL` and `URLSearchParams` implementations             | Net      |   🔵   |
| Advanced Sheet Schema management (`getSchema`, `insertSchema`) | Sheets   |   🔵   |
| Drive folder tree manipulation (`createFolder` by path)        | Drive    |   🔵   |
| Event Emitter for complex script workflows                     | Core     |   🔵   |
| Integrated Logger wrapper with remote logging support          | Core     |   ⚪   |

---

## Task List (Categorized)

### 📊 Google Sheets

- [ ] `prependColumn` / `prependColumns`
- [ ] `insertSchema`
- [ ] `getSchema(sheet: Sheet)`
- [ ] `removeSchema(sheet: Sheet)`
- [ ] `getValues(sheet: Sheet, config: Object)`
- [ ] `clearColumnsByConditional(sheet: Sheet, callback: Function)`
- [ ] `clearRowsByConditional(sheet: Sheet, callback: Function)`
- [ ] `deleteRowsByConditional(sheet: Sheet, callback: Function)`
- [ ] `deleteColumnsByConditional(sheet: Sheet, callback: Function)`
- [ ] `updateFormulas(sheet: Sheet)`
- [ ] `getNamedRangeByName(name: string)`
- [x] `requireSpreadsheet`

### 🎞️ Google Slides

- [x] `isSlide` / `isPresentation`
- [x] `requireSlide`
- [x] `getSlideIndex` / `getSlideByIndex`
- [x] `isValidSlideId` / `isValidPresentationId`
- [x] `findReplaceAllTextInSlide`
- [x] `convertMarkdownToRichText`

### 🛠️ Core & Base

- [ ] `sprintf`
- [ ] `formatDate`
- [ ] `getTriggerById(id)`
- [ ] `flat(value: Array | Object, depth?: number)`
- [ ] `namespace(obj: Object | Array, path: string | number | Array)`
- [ ] `unique(arr: Array)`
- [ ] `first(arr: Array)`
- [ ] `last(arr: Array)`
- [ ] `compact(arr: Array)`
- [ ] `without(arr: Array, ...values: any)`
- [ ] `intersect(arr: Array)`
- [ ] `merge(text: string, fields: Object)`
- [ ] `EventEmitter` (Abstract)
- [x] `nonEmptyString`
- [x] `requireRepository`
- [x] `requireService`
- [x] `AuthenticationException`
- [x] `SlideNotFoundException`
- [x] `InvalidPresentationException`
- [x] `InvalidSpreadsheetException`
- [x] `RepositoryIsNotDefinedException`
- [x] `ServiceIsNotDefinedException`

### 🔐 Crypto & Security

- [ ] `base64decode` / `base64encode`
- [ ] `md5`
- [ ] `sha1` / `sha256` / `sha512`
- [x] `requireValidToken`

### 🌐 Network & Drive

- [ ] `URL` and `URLSearchParams` abstractions
- [ ] `drive/createFolder(path: string, rootFolder?: Folder)`

### 📅 Time & Date

- [ ] `date/now`
- [ ] `date/diff`
- [ ] `date/getDaysInMonth`
- [ ] `date/getDaysLeftInMonth`
- [ ] `date/offset`

---

## Contributing to the Roadmap

We welcome community feedback! If you have a suggestion for the roadmap or want to prioritize a specific feature,
please [open an issue](https://github.com/MaksymStoianov/apps-script-utils/issues).
