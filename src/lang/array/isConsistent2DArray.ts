import { is2DArray } from "./is2DArray";

/**
 * Checks if the given input is a non-empty two-dimensional array whose rows all have the same length.
 *
 * This is the check to run before `Range#setValues`, which rejects a ragged
 * matrix with a message that names neither the offending row nor the reason.
 *
 * @example
 * ```javascript
 * isConsistent2DArray([[1, 2], [3, 4]]);  // => true
 * isConsistent2DArray([[1, 2], [3]]);     // => false
 * isConsistent2DArray([1, 2]);            // => false
 * isConsistent2DArray("abc");             // => false
 * ```
 *
 * @param   {unknown} arr - The input to check. It is expected to be an array potentially representing a matrix.
 * @returns {boolean} `true` if the input is a consistent 2D array (a matrix), `false` otherwise.
 * @see     {@link is2DArray}
 * @see     {@link requireConsistent2DArray}
 * @since   1.0.0
 * @version 1.1.0
 */
export function isConsistent2DArray(arr: unknown): arr is Array<Array<unknown>> {
  if (!is2DArray(arr)) {
    return false;
  }

  const length = arr[0].length;

  return arr.every((item) => length === item.length);
}
