/**
 * Checks if the provided value is a string.
 *
 * @example
 * ```javascript
 * isString(""); // => true
 * isString("abc"); // => true
 * isString(1); // => false
 * isString(null); // => false
 * isString([]); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a string; otherwise, `false`.
 * @see     {@link nonString}
 * @see     [isString on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isstring.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
