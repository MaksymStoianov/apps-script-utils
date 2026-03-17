import { is2DArray } from "./is2DArray";

/**
 * Asserts that the given input is a non-empty two-dimensional array where all its rows (subarrays) have the same length.
 *
 * @param   {unknown} arr - The input to check. It is expected to be an array potentially representing a matrix.
 * @returns {boolean} `true` if the input is a consistent 2D array (a matrix), `false` otherwise.
 * @throws  {@link Error}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isConsistent2DArray(arr: unknown): arr is Array<Array<unknown>> {
  if (!is2DArray(arr)) {
    throw new Error(
      "Input array must be a non-empty two-dimensional array (all elements must be arrays)."
    );
  }

  const length = arr[0].length;

  return arr.every((item) => length === item.length);
}
