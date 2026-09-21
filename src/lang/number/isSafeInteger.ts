import { isNumber } from "../base";

/**
 * Checks if a value is a number and a safe integer.
 *
 * A safe integer is one that can be exactly represented as an IEEE-754 double,
 * meaning it lies within `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`
 * inclusive. Beyond that range distinct mathematical integers collapse onto the
 * same value, so arithmetic silently stops being exact.
 *
 * @example
 * ```javascript
 * isSafeInteger(42);                         // => true
 * isSafeInteger(Number.MAX_SAFE_INTEGER);    // => true
 * isSafeInteger(Number.MAX_SAFE_INTEGER + 2) // => false
 * isSafeInteger(1.5);                        // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a safe integer, otherwise `false`.
 * @see     {@link isInteger}
 * @see     {@link isNumber}
 * @since   1.11.0
 * @version 1.0.0
 */
export function isSafeInteger(value: unknown): value is number {
  return isNumber(value) && Number.isSafeInteger(value);
}
