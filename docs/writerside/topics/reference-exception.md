# Exceptions

<link-summary>Every exception class the library throws.</link-summary>

<web-summary>Reference of the exception classes in apps-script-utils: what each one means and which functions throw it.</web-summary>

Typed exception classes used throughout the library. Domain-specific exceptions (Sheets, Slides, Admin SDK, network)
extend a common `Exception` base class for consistent error handling.

A **New** marker indicates a function added in the latest release; a **Deprecated** marker indicates a function
scheduled for removal in a future release.

## Service-specific exceptions

| Exception                                                                 | Description                                                                                                                                                     |
| :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AdminDirectoryException`](AdminDirectoryException.md)                   | Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.                                                                |
| [`InvalidGridRangeException`](InvalidGridRangeException.md)               | Represents an exception thrown when an invalid [`GridRange`](GridRange.md) object is provided.                                                                  |
| [`InvalidRangeException`](InvalidRangeException.md)                       | Represents an exception thrown when an invalid [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range) object is provided.             |
| [`InvalidSheetException`](InvalidSheetException.md)                       | Represents an exception thrown when an invalid [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet) object is provided.             |
| [`InvalidSpreadsheetException`](InvalidSpreadsheetException.md) **New**   | Represents an exception thrown when an invalid [`Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet) object is provided. |
| [`InvalidPresentationException`](InvalidPresentationException.md) **New** | Represents an exception thrown when an invalid [`Presentation`](https://developers.google.com/apps-script/reference/slides/presentation) object is provided.    |
| [`SlideNotFoundException`](SlideNotFoundException.md) **New**             | Represents an exception thrown when a [`Slide`](https://developers.google.com/apps-script/reference/slides/slide) object is not found.                          |

## Core exceptions

| Exception                                                                       | Description                                                                                 |
| :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| [`Exception`](Exception.md)                                                     | Base class for all custom exceptions.                                                       |
| [`RuntimeException`](RuntimeException.md)                                       | Exception thrown during application execution.                                              |
| [`AuthenticationException`](AuthenticationException.md) **New**                 | Exception thrown during authentication failures.                                            |
| [`AuthorizationException`](AuthorizationException.md) **New**                   | Exception thrown when the current user is known but is not permitted to perform the action. |
| [`EmptyStringException`](EmptyStringException.md)                               | Exception thrown when a non-empty string is required but an empty one is provided.          |
| [`IllegalArgumentException`](IllegalArgumentException.md)                       | Exception thrown when an invalid or inappropriate argument is passed to a method.           |
| [`IllegalStateException`](IllegalStateException.md) **New**                     | Exception thrown when a method is invoked at an illegal or inappropriate time.              |
| [`InvalidEmailFormatException`](InvalidEmailFormatException.md)                 | Exception thrown when an email address does not follow the expected format.                 |
| [`InvalidStringException`](InvalidStringException.md)                           | Exception thrown when a string is expected but another type is received.                    |
| [`NullPointerException`](NullPointerException.md)                               | Exception thrown when `null` is encountered where an object is required.                    |
| [`RepositoryIsNotDefinedException`](RepositoryIsNotDefinedException.md) **New** | Exception thrown when a repository is not defined.                                          |
| [`ServiceIsNotDefinedException`](ServiceIsNotDefinedException.md) **New**       | Exception thrown when a service is not defined.                                             |
