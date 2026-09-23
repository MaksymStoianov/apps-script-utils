/**
 * Checks if the provided value is `null`.
 *
 * @example
 * ```javascript
 * isNull(null); // => true
 * isNull(undefined); // => false
 * isNull(0); // => false
 * isNull(""); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is `null`; otherwise, `false`.
 * @see     {@link nonNull}
 * @see     [isNull on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isnull.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
