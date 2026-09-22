import { isArray } from "../base";

/**
 * Creates a new array with the duplicates removed, keeping the first
 * occurrence of each value.
 *
 * Values are compared with `SameValueZero`, the rule a `Set` uses: `NaN`
 * deduplicates against `NaN`, which `===` never does, and `-0` collapses with
 * `0`.
 *
 * An optional `iteratee` produces the key a value is compared by, which is how
 * objects are deduplicated — by an id, say, rather than by identity.
 *
 * @example
 * ```javascript
 * unique([1, 2, 2, 3]);                        // => [1, 2, 3]
 * unique([NaN, NaN]);                          // => [NaN]
 * unique([0, -0]);                             // => [0]
 * unique([{ id: 1 }, { id: 1 }], (o) => o.id); // => [{ id: 1 }]
 * ```
 *
 * @template T - The type of elements in the input array.
 * @template K - The type of the comparison key.
 * @param    {T[]} array - The array to deduplicate.
 * @param    {(value: T) => K} [iteratee] - Optional function producing the key each value is compared by.
 * @returns  {T[]} A new array without duplicates. The input is left untouched.
 * @throws   {@link TypeError} If `array` is not an array.
 * @see      {@link intersect}
 * @since    1.11.0
 * @version  1.0.0
 */
export function unique<T, K = T>(array: T[], iteratee?: (value: T) => K): T[] {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  if (!iteratee) {
    return Array.from(new Set(array));
  }

  const seen = new Map<K, T>();

  for (const value of array) {
    const key = iteratee(value);

    if (!seen.has(key)) {
      seen.set(key, value);
    }
  }

  return Array.from(seen.values());
}
