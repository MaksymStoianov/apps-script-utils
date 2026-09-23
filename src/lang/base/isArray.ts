/**
 * Checks if the provided value is an `Array`.
 *
 * @example
 * ```javascript
 * isArray([]); // => true
 * isArray([1, 2, 3]); // => true
 * isArray("abc"); // => false
 * isArray({ length: 0 }); // => false
 * isArray(null); // => false
 * ```
 *
 * @template T - The type of elements within the array.
 * @param    {unknown} value - The value to check.
 * @returns  {boolean} `true` if the value is an `Array`; otherwise, `false`.
 * @see      {@link nonArray}
 * @see      [isArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isArray.html)
 * @since    1.4.0
 * @version  1.0.0
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
