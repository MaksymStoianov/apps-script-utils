/**
 * Checks if the provided value is a boolean.
 *
 * @example
 * ```javascript
 * isBoolean(true); // => true
 * isBoolean(false); // => true
 * isBoolean("true"); // => false
 * isBoolean(1); // => false
 * isBoolean(null); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a boolean; otherwise, `false`.
 * @see     {@link nonBoolean}
 * @see     [isBoolean on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isboolean.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}
