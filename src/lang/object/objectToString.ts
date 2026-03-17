/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @param   {unknown} value - The value to convert.
 * @returns {string} The converted string.
 * @since   1.0.0
 * @version 1.0.0
 */
export function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}
