import { IllegalArgumentException } from "../../exception";
import { isNil } from "../base";

/**
 * Ensures that a collection contains no `null` or `undefined` elements, and returns it.
 *
 * An array with a hole in it passes every other guard: it is non-null, non-empty and a valid array.
 * The gap surfaces later as a blank cell or a `Cannot read properties of undefined`. This catches it
 * at the boundary.
 *
 * - Accepts an array, a `Set`, or a `Map` (checking its values).
 * - A `null` or `undefined` collection passes through unchanged; that case belongs to
 *   {@link requireNonNull}, and stacking the two should not report it twice.
 * - Checks the top level only; nested arrays are opaque.
 *
 * @example
 * ```javascript
 * sheet.getRange(1, 1, 1, 3).setValues([requireNoNilElements(["a", "b", "c"])]);
 * requireNoNilElements([1, undefined, 3]); // throws IllegalArgumentException
 * ```
 *
 * @template    T - The element type.
 * @param       {T[] | Set<T> | Map<unknown, T> | null | undefined} values - The collection to check.
 * @param       {string} [message] - The message for the exception; a default is used when omitted.
 * @returns     {T[] | Set<T> | Map<unknown, T> | null | undefined} The same collection, typed without the nils.
 * @throws      {IllegalArgumentException} If an element is `null` or `undefined`, or if `values` is not a collection.
 * @see         {@link requireNonNull}
 * @see         {@link requireNonEmpty}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function requireNoNilElements<T>(values: T[], message?: string): NonNullable<T>[];

export function requireNoNilElements<T>(
  values: readonly T[],
  message?: string
): readonly NonNullable<T>[];

export function requireNoNilElements<T>(values: Set<T>, message?: string): Set<NonNullable<T>>;

export function requireNoNilElements<K, V>(
  values: Map<K, V>,
  message?: string
): Map<K, NonNullable<V>>;

export function requireNoNilElements<T extends null | undefined>(values: T, message?: string): T;

export function requireNoNilElements(values: unknown, message?: string): unknown {
  if (isNil(values)) {
    return values;
  }

  let elements: Iterable<unknown>;

  if (Array.isArray(values) || values instanceof Set) {
    elements = values;
  } else if (values instanceof Map) {
    elements = values.values();
  } else {
    throw new IllegalArgumentException("Expected an array, a Set or a Map.");
  }

  for (const element of elements) {
    if (isNil(element)) {
      throw new IllegalArgumentException(
        message ?? "Collection must not contain any null or undefined elements."
      );
    }
  }

  return values;
}
