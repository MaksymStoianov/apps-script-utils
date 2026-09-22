# path module

<link-summary>Every path and URL function.</link-summary>

<web-summary>Reference of the path and URL functions in apps-script-utils: parsing, joining, normalising, and validating paths and domains.</web-summary>

Functions for working with file paths and URLs.

| Function                                              | Return type                   | Brief description                                                                                |
| :---------------------------------------------------- | :---------------------------- | :----------------------------------------------------------------------------------------------- |
| [`isAbsolute`](isAbsolute.md)                         | `Boolean`                     | Determines if a given path is an absolute path.                                                  |
| [`isRelative`](isRelative.md)                         | `Boolean`                     | Determines if a given path is a relative path.                                                   |
| [`isValidDomain`](isValidDomain.md)                   | `Boolean`                     | Validates if a string is a properly formatted domain name.                                       |
| [`join`](join.md)                                     | `String`                      | Joins all given path segments together using the platform-specific separator.                    |
| [`nonAbsolute`](nonAbsolute.md) **New**               | `Boolean`                     | Validates if a path is **not** absolute.                                                         |
| [`nonRelative`](nonRelative.md) **New**               | `Boolean`                     | Validates if a path is **not** relative.                                                         |
| [`nonValidDomain`](nonValidDomain.md) **New**         | `Boolean`                     | Validates if a value is **not** a valid domain name.                                             |
| [`normalize`](normalize.md)                           | `String`                      | Normalizes a path by resolving `.` and `..` segments.                                            |
| [`parse`](parse.md)                                   | [`ParsedPath`](ParsedPath.md) | Breaks down a path into an object containing its constituent parts (root, dir, base, ext, name). |
| [`requireAbsolute`](requireAbsolute.md) **New**       | `String`                      | Ensures a path is absolute, throwing otherwise.                                                  |
| [`requireRelative`](requireRelative.md) **New**       | `String`                      | Ensures a path is relative, throwing otherwise.                                                  |
| [`requireValidDomain`](requireValidDomain.md) **New** | `String`                      | Ensures a value is a valid domain name, throwing otherwise.                                      |
