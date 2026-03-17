/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @param   value - The value to convert.
 * @returns The converted string.
 * @since   1.0.0
 * @version 1.0.0
 */
export function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}
