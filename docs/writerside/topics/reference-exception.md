# Exceptions

Typed exception classes used throughout the library. Domain-specific exceptions (Sheets, Slides, Admin SDK, network)
extend a common `Exception` base class for consistent error handling.

A **New** marker indicates a function added in the latest release; a **Deprecated** marker indicates a function
scheduled for removal in a future release.

## Service-specific exceptions

| Exception                                                                                                                                                              | Description                                                                                                                                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AdminDirectoryException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/admin/AdminDirectoryException.ts)                   | Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.                                                                                        |
| [`InvalidGridRangeException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/sheet/InvalidGridRangeException.ts)               | Represents an exception thrown when an invalid [`GridRange`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/appsscript/sheet/types/GridRange.ts) object is provided. |
| [`InvalidRangeException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/sheet/InvalidRangeException.ts)                       | Represents an exception thrown when an invalid [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range) object is provided.                                     |
| [`InvalidSheetException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/sheet/InvalidSheetException.ts)                       | Represents an exception thrown when an invalid [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet) object is provided.                                     |
| [`InvalidSpreadsheetException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/sheet/InvalidSpreadsheetException.ts) **New**   | Represents an exception thrown when an invalid [`Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet) object is provided.                         |
| [`InvalidPresentationException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/slide/InvalidPresentationException.ts) **New** | Represents an exception thrown when an invalid [`Presentation`](https://developers.google.com/apps-script/reference/slides/presentation) object is provided.                            |
| [`SlideNotFoundException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/appsscript/slide/SlideNotFoundException.ts) **New**             | Represents an exception thrown when a [`Slide`](https://developers.google.com/apps-script/reference/slides/slide) object is not found.                                                  |

## Core exceptions

| Exception                                                                                                                                                   | Description                                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [`Exception`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/Exception.ts)                                                     | Base class for all custom exceptions.                                                       |
| [`RuntimeException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/RuntimeException.ts)                                       | Exception thrown during application execution.                                              |
| [`AuthenticationException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/net/AuthenticationException.ts) **New**             | Exception thrown during authentication failures.                                            |
| [`AuthorizationException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/AuthorizationException.ts) **New**                   | Exception thrown when the current user is known but is not permitted to perform the action. |
| [`EmptyStringException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/EmptyStringException.ts)                               | Exception thrown when a non-empty string is required but an empty one is provided.          |
| [`IllegalArgumentException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/IllegalArgumentException.ts)                       | Exception thrown when an invalid or inappropriate argument is passed to a method.           |
| [`IllegalStateException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/IllegalStateException.ts) **New**                     | Exception thrown when a method is invoked at an illegal or inappropriate time.              |
| [`InvalidEmailFormatException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/InvalidEmailFormatException.ts)                 | Exception thrown when an email address does not follow the expected format.                 |
| [`InvalidStringException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/InvalidStringException.ts)                           | Exception thrown when a string is expected but another type is received.                    |
| [`NullPointerException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/NullPointerException.ts)                               | Exception thrown when `null` is encountered where an object is required.                    |
| [`RepositoryIsNotDefinedException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/RepositoryIsNotDefinedException.ts) **New** | Exception thrown when a repository is not defined.                                          |
| [`ServiceIsNotDefinedException`](https://github.com/MaksymStoianov/apps-script-utils/blob/main/src/exception/ServiceIsNotDefinedException.ts) **New**       | Exception thrown when a service is not defined.                                             |
