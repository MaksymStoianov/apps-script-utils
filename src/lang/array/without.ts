import { isArray } from "../base";

/**
 * Creates a new array with every occurrence of the given values removed.
 *
 * Values are compared with `SameValueZero`: `without([NaN], NaN)` returns `[]`,
 * which an `indexOf` scan cannot do because strict equality never matches
 * `NaN`. `-0` and `0` match each other.
 *
 * The exclusions are collected into a set once, so the cost is linear in the
 * length of the array rather than quadratic.
 *
 * @example
 * ```javascript
 * without([1, 2, 3, 2], 2);     // => [1, 3]
 * without([1, 2, 3], 2, 3);     // => [1]
 * without([NaN, 1], NaN);       // => [1]
 * without([1, 2], 9);           // => [1, 2]
 * ```
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to filter.
 * @param    {...T} values - The values to exclude.
 * @returns  {T[]} A new array without those values. The input is left untouched.
 * @throws   {@link TypeError} If `array` is not an array.
 * @see      {@link compact}
 * @see      {@link intersect}
 * @see      [without on the documentation site](https://maksymstoianov.github.io/apps-script-utils/without.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  if (values.length === 0) {
    return array.slice();
  }

  const excluded = new Set(values);

  return array.filter((value: T): boolean => !excluded.has(value));
}
