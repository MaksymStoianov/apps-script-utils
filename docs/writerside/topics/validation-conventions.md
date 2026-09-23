# Validation conventions

<link-summary>The isX / nonX / requireX / requireNonX naming scheme and what each prefix guarantees.</link-summary>

<web-summary>The validation naming scheme of apps-script-utils: isX and nonX answer questions, requireX and requireNonX validate and return, and every prefix has one signature.</web-summary>

Most of this library is validation, and almost all of it follows one naming scheme. Learn the four prefixes once and
the name of a function tells you its signature, its return value, and whether it can throw.

## The four prefixes

| Prefix        | Answers                                       | Returns                      | Throws                   |
| :------------ | :-------------------------------------------- | :--------------------------- | :----------------------- |
| `isX`         | Is this value an `X`?                         | `boolean`                    | No                       |
| `nonX`        | Is this value _not_ an `X`?                   | `boolean`                    | No                       |
| `requireX`    | Give me this value as an `X`.                 | the value, typed as `X`      | Yes, if it is not an `X` |
| `requireNonX` | Give me this value, knowing it is not an `X`. | the value, with `X` excluded | Yes, if it is an `X`     |

The `isX` and `nonX` pair are predicates: they answer a question and never interrupt control flow. The `requireX` and
`requireNonX` pair are assertions: they hand the value back so the call can be used inline, or throw.

## Predicates narrow types

`isX` guards are declared as TypeScript type predicates, so the compiler narrows the value inside the branch:

```typescript
import { isString } from "apps-script-utils";

function describe(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase(); // value is string here
  }

  return "not a string";
}
```

`nonX` narrows in the opposite direction — it removes `X` from the type rather than confirming it:

```typescript
import { nonString } from "apps-script-utils";

function lengthOf(value: string | number): number {
  if (nonString(value)) {
    return value; // value is number here
  }

  return value.length;
}
```

Writing `nonX(value)` is the same test as `!isX(value)`. The point of the prefix is that a guard clause reads as a
sentence rather than as a negation, which matters where the alternative would be `if (!isConsistent2DArray(rows))`.

## Assertions return the value

`requireX` validates and returns, so it composes into an expression instead of forcing a separate statement:

```typescript
import { requireNumber, requireString } from "apps-script-utils";

function repeat(text: unknown, times: unknown): string {
  return requireString(text).repeat(requireNumber(times));
}
```

Every `requireX` takes an optional trailing `message` argument, used as the exception message when validation fails:

```typescript
requireString(config.sheetName, "sheetName must be a string");
```

Which exception each one throws is listed in [](exception-handling.md).

## `X` and `XLike`

A few predicates come in a strict and a permissive form. The plain name tests the type; the `Like` suffix tests
whether the value can be _used_ as that type:

| Function         | Accepts                                                                   |
| :--------------- | :------------------------------------------------------------------------ |
| `isNumber`       | any value whose `typeof` is `number`, including `NaN` and `Infinity`      |
| `isNumberLike`   | finite numbers, and non-blank strings that convert to a finite number     |
| `isObject`       | any non-nil value whose `typeof` is `object` — arrays and dates included  |
| `isObjectLike`   | the same, plus functions                                                  |
| `isFunction`     | values tagged as a function, generator function, async function, or proxy |
| `isFunctionLike` | any non-nil value whose `typeof` is `function`                            |

Reach for the `Like` form when the value comes from a spreadsheet cell, a form response, or a URL parameter, where a
number has usually arrived as a string.

## Null, undefined, and nil

Three names cover the empty cases, and the distinction is exact:

| Function      | True for         |
| :------------ | :--------------- |
| `isNull`      | `null` only      |
| `isUndefined` | `undefined` only |
| `isNil`       | either           |

`requireNonNull` is the assertion that pairs with `isNil`, not with `isNull` — it rejects `null` and `undefined`
alike and throws `NullPointerException`:

```typescript
import { requireNonNull } from "apps-script-utils";

const sheet = requireNonNull(spreadsheet.getSheetByName("Data"), "sheet 'Data' is missing");
```

`isEmpty` is a wider test again. It is true for `null` and `undefined`, for a string that is empty or contains only
whitespace, for an empty array, for a `Set` or `Map` of size zero, and for a plain object with no enumerable
properties. It is false for every other value, including `0` and `false`. Pass `true` as the second argument to
treat only a zero-length string as empty:

```typescript
isEmpty("   "); // true
isEmpty("   ", true); // false
isEmpty(0); // false
```

## Coverage

The four prefixes describe a grid, and most of it is filled: every type that has an `isX` has a `nonX`, `requireX`
covers the types a call is likely to validate, and `requireNonX` exists for the whole of `lang/base` as well as for
the numeric kinds. A combination that is missing is missing because nothing has needed it yet, not because it is
ruled out; open an issue and it can be added.

Every function listed in the reference has a page of its own, and every page is generated from a symbol the package
actually exports — so a name that appears in the tables can be imported.

## One exception to the rule

`nonEmptyString` does not follow the convention. Despite the `non` prefix it validates and returns a value, and
throws on failure — it is a `requireX` function under a misleading name. It is deprecated in favour of
`requireNonEmptyString`, which behaves identically under the right name, and will be removed in a future major
release.

```typescript
// Deprecated
const name = nonEmptyString(input);

// Use instead
const name = requireNonEmptyString(input);
```
