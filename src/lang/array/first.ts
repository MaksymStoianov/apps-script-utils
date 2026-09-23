import { isArray } from "../base";
import { isInteger } from "../number";

/**
 * Gets the first element of an array.
 *
 * @example
 * ```javascript
 * first([1, 2, 3]); // => 1
 * first([]); // => undefined
 * first([1, 2, 3], 2); // => [1, 2]
 * ```
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @returns  {T | undefined} The first element, or `undefined` if the array is empty.
 * @see [first on the documentation site](https://maksymstoianov.github.io/apps-script-utils/first.html)
 */
export function first<T>(array: T[]): T | undefined;

/**
 * Gets the first `n` elements of an array.
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @param    {number} n - How many elements to take. Clamped to the length of the array.
 * @returns  {T[]} A new array of at most `n` elements.
 */
export function first<T>(array: T[], n: number): T[];

/**
 * Gets the first element of an array, or its first `n` elements.
 *
 * The one-argument form returns `undefined` for an empty array rather than
 * throwing, which is what spares every call site its own emptiness check.
 *
 * `n` is clamped: a negative count yields an empty array and a count beyond
 * the length yields the whole array, as `Array#slice` does.
 *
 * @example
 * ```javascript
 * first([1, 2, 3]);      // => 1
 * first([]);             // => undefined
 * first([1, 2, 3], 2);   // => [1, 2]
 * first([1, 2], 10);     // => [1, 2]
 * first([1, 2], -1);     // => []
 * ```
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @param    {number} [n] - How many elements to take. Omit it to take a single element.
 * @returns  {T | T[] | undefined} The first element, or a new array of at most `n` elements. The input is left untouched.
 * @throws   {@link TypeError} If `array` is not an array.
 * @throws   {@link TypeError} If `n` is given and is not an integer.
 * @see      {@link last}
 * @since    1.11.0
 * @version  1.0.0
 */
export function first<T>(array: T[], n?: number): T | T[] | undefined {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  if (n === undefined) {
    return array[0];
  }

  if (!isInteger(n)) {
    throw new TypeError("Input 'n' must be an integer.");
  }

  return array.slice(0, Math.max(n, 0));
}
