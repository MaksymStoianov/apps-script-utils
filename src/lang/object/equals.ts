import { isNil } from "../base";
import { objectToString } from "./objectToString";

interface Equatable {
  equals(other: unknown): boolean;
}

type Pair = readonly [object, object];

/**
 * Compares two values for equality, deeply and without tripping over `null`.
 *
 * Two values are equal when they are the same value, or when they are structurally the same:
 *
 * - `NaN` equals `NaN`; `+0` equals `-0`.
 * - `null` and `undefined` equal only themselves.
 * - Arrays and typed arrays compare by length and by element, recursively.
 * - `Map` and `Set` compare by size and membership; set members and map values compare deeply.
 * - `Date` by instant, `RegExp` by source and flags, boxed primitives by their value.
 * - Plain objects by own enumerable keys and values, recursively, in any key order.
 * - An object that defines its own `equals(other)` decides for itself.
 * - Objects of different prototypes are never equal.
 *
 * Anything else — functions, class instances without `equals` — compares by reference.
 * A structure that refers to itself terminates instead of recursing forever.
 *
 * @example
 * ```javascript
 * equals({ a: [1, { b: NaN }] }, { a: [1, { b: NaN }] }); // true
 * equals(new Date(0), new Date(0));                      // true
 * equals([1, 2], [2, 1]);                                // false
 * equals(null, undefined);                               // false
 * ```
 *
 * @param       {unknown} a - The first value.
 * @param       {unknown} b - The second value.
 * @returns     {boolean} `true` if the values are equal by the rules above.
 * @see         {@link hashCode}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function equals(a: unknown, b: unknown): boolean {
  return deepEquals(a, b, []);
}

function sameValueZero(a: unknown, b: unknown): boolean {
  return a === b || (a !== a && b !== b);
}

function hasOwnEquals(value: object): value is Equatable {
  return typeof (value as Partial<Equatable>).equals === "function";
}

function deepEquals(a: unknown, b: unknown, seen: Pair[]): boolean {
  if (sameValueZero(a, b)) {
    return true;
  }

  if (isNil(a) || isNil(b) || typeof a !== typeof b || typeof a !== "object") {
    return false;
  }

  const left = a as object;

  const right = b as object;

  if (hasOwnEquals(left)) {
    return left.equals(right);
  }

  if (Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) {
    return false;
  }

  for (const [x, y] of seen) {
    if (x === left && y === right) {
      return true;
    }
  }

  seen.push([left, right]);

  try {
    return compareStructure(left, right, seen);
  } finally {
    seen.pop();
  }
}

function compareStructure(left: object, right: object, seen: Pair[]): boolean {
  if (Array.isArray(left)) {
    return compareIndexed(left, right as unknown[], seen);
  }

  if (ArrayBuffer.isView(left) && !(left instanceof DataView)) {
    return compareIndexed(
      left as unknown as ArrayLike<unknown>,
      right as unknown as ArrayLike<unknown>,
      seen
    );
  }

  if (left instanceof Map) {
    return compareMaps(left, right as Map<unknown, unknown>, seen);
  }

  if (left instanceof Set) {
    return compareSets(left, right as Set<unknown>, seen);
  }

  switch (objectToString(left)) {
    case "[object Date]":
      return sameValueZero((left as Date).getTime(), (right as Date).getTime());

    case "[object RegExp]":
      return (
        (left as RegExp).source === (right as RegExp).source &&
        (left as RegExp).flags === (right as RegExp).flags
      );

    case "[object Number]":
    case "[object String]":
    case "[object Boolean]":
      return sameValueZero(left.valueOf(), right.valueOf());

    case "[object Object]": {
      // Only a plain object is compared by its contents. An instance of a class
      // that has not said how it compares is compared by reference, and that
      // path has already been exhausted above.
      const prototype = Object.getPrototypeOf(left);

      if (prototype !== Object.prototype && prototype !== null) {
        return false;
      }

      return compareRecords(
        left as Record<string, unknown>,
        right as Record<string, unknown>,
        seen
      );
    }

    default:
      return false;
  }
}

function compareIndexed(
  left: ArrayLike<unknown>,
  right: ArrayLike<unknown>,
  seen: Pair[]
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let i = 0; i < left.length; i++) {
    if (!deepEquals(left[i], right[i], seen)) {
      return false;
    }
  }

  return true;
}

function compareMaps(
  left: Map<unknown, unknown>,
  right: Map<unknown, unknown>,
  seen: Pair[]
): boolean {
  if (left.size !== right.size) {
    return false;
  }

  for (const [key, value] of left) {
    if (!right.has(key) || !deepEquals(value, right.get(key), seen)) {
      return false;
    }
  }

  return true;
}

function compareSets(left: Set<unknown>, right: Set<unknown>, seen: Pair[]): boolean {
  if (left.size !== right.size) {
    return false;
  }

  for (const value of left) {
    if (right.has(value)) {
      continue;
    }

    let matched = false;

    for (const candidate of right) {
      if (deepEquals(value, candidate, seen)) {
        matched = true;

        break;
      }
    }

    if (!matched) {
      return false;
    }
  }

  return true;
}

function compareRecords(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
  seen: Pair[]
): boolean {
  const keys = Object.keys(left);

  if (keys.length !== Object.keys(right).length) {
    return false;
  }

  for (const key of keys) {
    if (
      !Object.prototype.hasOwnProperty.call(right, key) ||
      !deepEquals(left[key], right[key], seen)
    ) {
      return false;
    }
  }

  return true;
}
