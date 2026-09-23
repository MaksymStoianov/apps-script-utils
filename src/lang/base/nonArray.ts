import { isArray } from "./isArray";

/**
 * Checks if the provided value is NOT `Array`.
 *
 * @example
 * ```javascript
 * nonArray("abc"); // => true
 * nonArray({ length: 0 }); // => true
 * nonArray(null); // => true
 * nonArray([]); // => false
 * nonArray([1, 2, 3]); // => false
 * ```
 *
 * @template T
 * @param   {T | unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not `Array`; otherwise, `false`.
 * @see     {@link isArray}
 * @see     [nonArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonArray.html)
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonArray<T>(
  value: T | unknown
): value is Exclude<T | unknown, unknown[] | Array<unknown>> {
  return !isArray(value);
}
