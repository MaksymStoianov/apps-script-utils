import { is2DArray } from "./is2DArray";

/**
 * Checks if the given input is NOT a non-empty two-dimensional array.
 *
 * An empty array qualifies as "not two-dimensional", since {@link is2DArray}
 * requires at least one row.
 *
 * @example
 * ```javascript
 * non2DArray([1, 2]);        // => true
 * non2DArray([]);            // => true
 * non2DArray("abc");         // => true
 * non2DArray([[1], [2]]);    // => false
 * ```
 *
 * @template T
 * @param   {T | Array<Array<unknown>>} arr - The input to check.
 * @returns {boolean} `true` if the input is not a two-dimensional array; otherwise, `false`.
 * @see     {@link is2DArray}
 * @see     {@link require2DArray}
 * @see     [non2DArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/non2DArray.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function non2DArray<T>(arr: T | Array<Array<unknown>>): arr is T {
  return !is2DArray(arr);
}
