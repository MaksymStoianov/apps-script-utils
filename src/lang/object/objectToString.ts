/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @example
 * ```javascript
 * objectToString([]); // => "[object Array]"
 * objectToString(null); // => "[object Null]"
 * objectToString(new Date()); // => "[object Date]"
 * ```
 *
 * @param   {unknown} value - The value to convert.
 * @returns {string} The converted string.
 * @see [objectToString on the documentation site](https://maksymstoianov.github.io/apps-script-utils/objecttostring.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}
