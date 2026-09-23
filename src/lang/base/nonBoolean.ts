import { isBoolean } from "./isBoolean";

/**
 * Checks if the provided value is NOT `boolean`.
 *
 * @example
 * ```javascript
 * nonBoolean("true"); // => true
 * nonBoolean(1); // => true
 * nonBoolean(null); // => true
 * nonBoolean(true); // => false
 * nonBoolean(false); // => false
 * ```
 *
 * @template T
 * @param   {T | boolean} value - The value to check.
 * @returns {boolean} `true` if the value is not `boolean`; otherwise, `false`.
 * @since   1.1.0
 * @version 1.0.0
 */
export function nonBoolean<T>(value: T | boolean): value is T {
  return !isBoolean(value);
}
