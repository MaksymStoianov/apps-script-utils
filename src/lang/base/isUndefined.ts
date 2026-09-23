/**
 * Checks if the provided value is `undefined`.
 *
 * @example
 * ```javascript
 * isUndefined(undefined); // => true
 * isUndefined(null); // => false
 * isUndefined(0); // => false
 * isUndefined(""); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is `undefined`; otherwise, `false`.
 * @see     {@link nonUndefined}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}
