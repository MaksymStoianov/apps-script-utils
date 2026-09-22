# Exception handling

Every error this library raises is an instance of one class, `Exception`, or of something that extends it. A single
`catch` clause can therefore tell the library's own failures apart from anything else the runtime throws.

## The hierarchy

```text
Error
└── Exception
    └── RuntimeException
        ├── EmptyStringException
        ├── IllegalArgumentException
        ├── InvalidEmailFormatException
        ├── InvalidStringException
        ├── NullPointerException
        ├── RepositoryIsNotDefinedException
        ├── ServiceIsNotDefinedException
        ├── AuthenticationException
        ├── AdminDirectoryException
        ├── InvalidGridRangeException
        ├── InvalidRangeException
        ├── InvalidSheetException
        ├── InvalidSpreadsheetException
        ├── InvalidPresentationException
        └── SlideNotFoundException
```

Two levels carry meaning. `Exception` is the root and marks an error as coming from this library.
`RuntimeException` marks it as a failure raised while the script was running, and every concrete class extends it —
so catching `RuntimeException` catches everything the library currently throws.

## Catching

`Exception` exposes a static type guard, which is the recommended test because it also narrows the type:

```typescript
import { Exception, requireString } from "apps-script-utils";

try {
  requireString(input);
} catch (error) {
  if (Exception.isException(error)) {
    Logger.log(`${error.name}: ${error.getMessage()}`);
  } else {
    throw error;
  }
}
```

`instanceof` works as well, and is the way to catch one specific failure:

```typescript
import { NullPointerException, requireNonNull } from "apps-script-utils";

try {
  const sheet = requireNonNull(spreadsheet.getSheetByName("Data"));
} catch (error) {
  if (error instanceof NullPointerException) {
    Logger.log("Sheet 'Data' does not exist.");
  }
}
```

Each subclass sets `name` from its own constructor, so `error.name` reports the concrete class — `"NullPointerException"`,
not `"Exception"`.

## Constructing

Every exception takes an optional message. It accepts a string, an existing `Error` whose message is reused, or any
other value, which is ignored:

```typescript
throw new IllegalArgumentException("size must be a positive integer");
throw new IllegalArgumentException(caughtError); // reuses caughtError.message
throw new IllegalArgumentException(); // no message
```

`Exception.create()` is the equivalent factory, for the cases where a `new` expression does not fit.

The instances are ordinary `Error` objects underneath, so `getMessage()`, `toString()`, and `Object.prototype.toString.call()`
all behave:

```typescript
const error = new EmptyStringException("name is required");

error.getMessage(); // "name is required"
error.toString(); // "name is required"
Object.prototype.toString.call(error); // "[object EmptyStringException]"
```

## What throws what

| Exception                         | Raised by                                                                                                                                                         |
| :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IllegalArgumentException`        | the `requireX` guards for arrays, booleans, countables, functions, integers, numbers, objects, scalars and symbols, and most of the A1-notation and sheet helpers |
| `InvalidStringException`          | `requireString`, and the deprecated `nonEmptyString`                                                                                                              |
| `EmptyStringException`            | `requireNonEmptyString`, `escapeRegExp`                                                                                                                           |
| `NullPointerException`            | `requireNonNull`                                                                                                                                                  |
| `InvalidEmailFormatException`     | `requireValidEmail`                                                                                                                                               |
| `RepositoryIsNotDefinedException` | `requireRepository`                                                                                                                                               |
| `ServiceIsNotDefinedException`    | `requireService`                                                                                                                                                  |
| `AuthenticationException`         | `requireValidToken`                                                                                                                                               |
| `AdminDirectoryException`         | `isAdmin`, when the Admin SDK Directory Service is not enabled                                                                                                    |
| `InvalidSheetException`           | `requireSheet`                                                                                                                                                    |
| `InvalidSpreadsheetException`     | `requireSpreadsheet`                                                                                                                                              |
| `InvalidRangeException`           | `requireRange`                                                                                                                                                    |
| `InvalidGridRangeException`       | `toA1Notation` and the `GridRange` comparison helpers                                                                                                             |
| `SlideNotFoundException`          | `requireSlide`                                                                                                                                                    |

[](reference-exception.md) lists every class with a link to its source.

## Choosing a failure mode

Predicates never throw; assertions always do. Which to reach for depends on whether the bad input is expected:

```typescript
// Expected: a form field may legitimately be blank.
if (nonEmpty(response)) {
  process(response);
}

// Unexpected: a missing sheet is a broken configuration, not a case to handle.
const sheet = requireNonNull(spreadsheet.getSheetByName("Data"), "sheet 'Data' is missing");
```

Passing the optional `message` argument is worth the keystrokes — it is the only context the reader of an execution
log gets.
