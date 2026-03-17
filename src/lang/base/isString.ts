/**
 * Checks if the provided value is a string.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a string; otherwise, `false`.
 * @see     {@link nonString}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
