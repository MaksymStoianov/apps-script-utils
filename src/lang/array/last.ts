import { isArray } from "../base";
import { isInteger } from "../number";

/**
 * Gets the last element of an array.
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @returns  {T | undefined} The last element, or `undefined` if the array is empty.
 */
export function last<T>(array: T[]): T | undefined;

/**
 * Gets the last `n` elements of an array, in their original order.
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @param    {number} n - How many elements to take. Clamped to the length of the array.
 * @returns  {T[]} A new array of at most `n` elements.
 */
export function last<T>(array: T[], n: number): T[];

/**
 * Gets the last element of an array, or its last `n` elements.
 *
 * This is what `array[array.length - 1]` is written for, an expression that
 * yields `undefined` on an empty array while looking deliberate about it.
 *
 * The `n` form takes from the end but preserves order: `last([1, 2, 3], 2)` is
 * `[2, 3]`, not `[3, 2]`. `n` is clamped, so a negative count yields an empty
 * array and a count beyond the length yields the whole array.
 *
 * @example
 * ```javascript
 * last([1, 2, 3]);      // => 3
 * last([]);             // => undefined
 * last([1, 2, 3], 2);   // => [2, 3]
 * last([1, 2], 10);     // => [1, 2]
 * last([1, 2], -1);     // => []
 * ```
 *
 * @template T - The type of elements in the input array.
 * @param    {T[]} array - The array to read from.
 * @param    {number} [n] - How many elements to take. Omit it to take a single element.
 * @returns  {T | T[] | undefined} The last element, or a new array of at most `n` elements. The input is left untouched.
 * @throws   {@link TypeError} If `array` is not an array.
 * @throws   {@link TypeError} If `n` is given and is not an integer.
 * @see      {@link first}
 * @since    1.11.0
 * @version  1.0.0
 */
export function last<T>(array: T[], n?: number): T | T[] | undefined {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  if (n === undefined) {
    return array[array.length - 1];
  }

  if (!isInteger(n)) {
    throw new TypeError("Input 'n' must be an integer.");
  }

  const count = Math.min(Math.max(n, 0), array.length);

  return array.slice(array.length - count);
}
