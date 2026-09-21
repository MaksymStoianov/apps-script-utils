# exception

`exception` holds the error classes the rest of the library throws. Nothing in it depends on the Apps Script
runtime.

## Packages

| Package                | Covers                                                       |
| :--------------------- | :----------------------------------------------------------- |
| `exception`            | the base classes and the general-purpose exceptions          |
| `exception/appsscript` | failures raised by the Sheets, Slides, and Admin SDK helpers |
| `exception/net`        | authentication failures                                      |

The hierarchy, the catching patterns, and the table of which function throws which exception are in
[](exception-handling.md). This page covers using the classes in your own code.

## Extending the hierarchy

A script with its own failure modes can join the hierarchy rather than throwing bare `Error` objects. Extend
`RuntimeException` for anything raised while the script runs:

```typescript
import { RuntimeException } from "apps-script-utils";

export class QuotaExceededException extends RuntimeException {}
```

That is the whole class. `Exception` sets `name` from `new.target`, so the subclass reports its own name with no
constructor of its own:

```typescript
const error = new QuotaExceededException("daily email quota reached");

error.name; // "QuotaExceededException"
error.getMessage(); // "daily email quota reached"
Object.prototype.toString.call(error); // "[object QuotaExceededException]"
```

It also inherits the behaviour that matters at the catch site — `Exception.isException()` recognises it, and
`instanceof RuntimeException` holds.

## Wrapping a caught error

Every constructor accepts an existing `Error` and reuses its message, which keeps the original text while changing
the type:

```typescript
import { RuntimeException } from "apps-script-utils";

try {
  UrlFetchApp.fetch(endpoint);
} catch (error) {
  throw new RuntimeException(error);
}
```

## Choosing a class

Prefer an existing class where one fits — a caller that already handles `IllegalArgumentException` will handle
yours:

| Situation                                     | Class                                                             |
| :-------------------------------------------- | :---------------------------------------------------------------- |
| An argument is the wrong type or out of range | `IllegalArgumentException`                                        |
| A required value was `null` or `undefined`    | `NullPointerException`                                            |
| A string argument was empty                   | `EmptyStringException`                                            |
| A credential was missing or rejected          | `AuthenticationException`                                         |
| A dependency was never configured             | `ServiceIsNotDefinedException`, `RepositoryIsNotDefinedException` |

## Full list

[](reference-exception.md) lists every class with a link to its source.
