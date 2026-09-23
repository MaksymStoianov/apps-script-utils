import { isConsistent2DArray } from "./isConsistent2DArray";

/**
 * Checks if the given input is NOT a two-dimensional array with uniform row lengths.
 *
 * Reports `true` both for a ragged matrix and for anything that is not a
 * two-dimensional array at all — the two cases are indistinguishable here.
 * Use {@link non2DArray} when that difference matters.
 *
 * @example
 * ```javascript
 * nonConsistent2DArray([[1, 2], [3]]);     // => true  (ragged)
 * nonConsistent2DArray([1, 2]);            // => true  (not 2D)
 * nonConsistent2DArray([[1, 2], [3, 4]]);  // => false
 * ```
 *
 * @template T
 * @param   {T | Array<Array<unknown>>} arr - The input to check.
 * @returns {boolean} `true` if the input is not a consistent 2D array; otherwise, `false`.
 * @see     {@link isConsistent2DArray}
 * @see     {@link requireConsistent2DArray}
 * @see     {@link non2DArray}
 * @see     [nonConsistent2DArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonConsistent2DArray.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonConsistent2DArray<T>(arr: T | Array<Array<unknown>>): arr is T {
  return !isConsistent2DArray(arr);
}
