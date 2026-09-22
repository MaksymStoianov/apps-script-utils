import { isArray, isEmpty } from "../base";

/**
 * Checks if the given input is a non-empty two-dimensional array, meaning it's an array where ***all*** its elements are also arrays.
 *
 * An empty array is not considered two-dimensional, since there are no rows to
 * examine.
 *
 * @example
 * ```javascript
 * is2DArray([[1, 2], [3]]);  // => true
 * is2DArray([[1], 2]);       // => false
 * is2DArray([]);             // => false
 * is2DArray("abc");          // => false
 * ```
 *
 * @param   {unknown} arr - The input to check.
 * @returns {boolean} `true` if the input is a non-empty array where all its elements are arrays; otherwise, `false`.
 * If `true`, TypeScript will **narrow the type of `arr`** to `Array<Array<unknown>>`,
 * allowing safer access to its elements as arrays.
 * @see     {@link isConsistent2DArray}
 * @see     {@link require2DArray}
 * @since   1.0.0
 * @version 1.1.0
 */
export function is2DArray(arr: unknown): arr is Array<Array<unknown>> {
  return isArray(arr) && !isEmpty(arr) && arr.every(isArray);
}
