import { isConsistent2DArray } from "../array";
import { isArray } from "../base";

/**
 * Transposes a two-dimensional array (matrix), effectively swapping its rows and columns.
 *
 * @example
 * ```javascript
 * const arr = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 *
 * const result = transpose(arr);
 * // [
 * //   [1, 4, 7],
 * //   [2, 5, 8],
 * //   [3, 6, 9]
 * // ]
 * ```
 *
 * @param   {unknown} arr - The 2D array (matrix) to transpose. Its elements can be of any type.
 * @returns {Array<Array<unknown>>} A new 2D array representing the transposed matrix. The elements maintain their original types.
 * @throws  {@link Error}
 * @since   1.0.0
 * @version 1.0.0
 */
export function transpose(arr: unknown): Array<Array<unknown>> {
  if (!isArray(arr) || !isConsistent2DArray(arr)) {
    throw new Error("Input must be a 2D array.");
  }

  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
}
