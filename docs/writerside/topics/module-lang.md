# lang

<link-summary>The runtime-independent language utilities: guards, arrays, numbers, objects, strings.</link-summary>

<web-summary>The lang module of apps-script-utils: type guards, array and matrix helpers, number classification, object hashing, and string conversion, all runtime-independent.</web-summary>

`lang` holds the language-level utilities — the parts of the library that know nothing about Google Apps Script and
run anywhere JavaScript does.

## Packages

| Package       | Covers                                                        |
| :------------ | :------------------------------------------------------------ |
| `lang/base`   | the `isX` / `nonX` / `requireX` guards for the built-in types |
| `lang/array`  | array shape checks and transforms                             |
| `lang/number` | numeric classification and conversion                         |
| `lang/object` | hashing and string conversion                                 |
| `lang/string` | case conversion, validation, and version comparison           |

The library also ships `html`, `json`, and `time` as sibling packages. They are runtime-independent in the same way
and are listed alongside `lang` in [](reference-base.md).

## Type guards

`lang/base` is the largest package and the one most code touches. It is documented in full in
[](validation-conventions.md); in short, `isX` and `nonX` answer questions, `requireX` validates and returns.

```typescript
import { requireString, toKebabCase } from "apps-script-utils";

function slugify(input: unknown): string {
  return toKebabCase(requireString(input));
}
```

## Arrays

```typescript
import { chunk, transpose, is2DArray, isConsistent2DArray } from "apps-script-utils";

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

transpose([
  ["a", "b"],
  ["c", "d"]
]); // [["a", "c"], ["b", "d"]]

is2DArray([[1], [2]]); // true
isConsistent2DArray([[1, 2], [3]]); // false — rows differ in length
```

`isConsistent2DArray` is the check worth making before writing to a sheet: `Range.setValues()` requires every row to
have the same length, and a ragged array fails at the service boundary with a message that does not say which row
was wrong.

## Numbers

```typescript
import { isCountable, isFloat, isInteger, toInteger } from "apps-script-utils";

isInteger(42); // true
isInteger(42.5); // false
isFloat(42.5); // true
isCountable(3); // true — a non-negative whole number
isCountable(-1); // false
```

Row and column arguments in the Sheets API are counts, not arbitrary numbers, which is what `isCountable` and
`requireCountable` are for.

## Strings

Case conversion:

```typescript
import { toCamelCase, toKebabCase, toSnakeCase, toProperCase } from "apps-script-utils";

toCamelCase("user name"); // "userName"
toKebabCase("User Name"); // "user-name"
toSnakeCase("User Name"); // "user_name"
toProperCase("user name"); // "User Name"
```

Validation:

```typescript
import { isEmail, isValidSlug, isValidVersion, requireValidEmail } from "apps-script-utils";

isEmail("ada@example.com"); // true
isValidSlug("my-post"); // true
isValidVersion("1.10.0"); // true

requireValidEmail(formResponse); // returns it, or throws InvalidEmailFormatException
```

Version comparison, for scripts that gate behaviour on a library version:

```typescript
import { versionCompare, isVersionCompatible } from "apps-script-utils";

versionCompare("1.10.0", "1.9.0"); // 1
versionCompare("1.9.0", "1.10.0"); // -1
versionCompare("1.9.0", "1.9.0"); // 0
```

`escapeRegExp` makes a user-supplied string safe to interpolate into a pattern — worth using whenever a search term
comes from a cell or a form:

```typescript
import { escapeRegExp } from "apps-script-utils";

const pattern = new RegExp(escapeRegExp(searchTerm), "gi");
```

## Objects

```typescript
import { hashCode, objectToString } from "apps-script-utils";

objectToString([]); // "[object Array]"
objectToString(null); // "[object Null]"
hashCode("apps-script-utils"); // a stable numeric hash
```

`objectToString` reports the internal tag rather than `String(value)`, which makes it the reliable way to tell an
array from a date from a plain object — and the tag survives crossing a frame boundary, where `instanceof` does not.

## Full list

[](reference-base.md) lists every function in `lang`, `html`, `json`, and `time` with its return type and a link to
its source.
