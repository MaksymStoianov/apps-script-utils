import { isInteger } from "./isInteger";

/**
 * Checks if a value is NOT a number and an integer.
 *
 * @example
 * ```javascript
 * nonInteger(1.5); // => true
 * nonInteger(NaN); // => true
 * nonInteger("42"); // => true
 * nonInteger(42); // => false
 * nonInteger(-7); // => false
 * nonInteger(0); // => false
 * ```
 *
 * @template T
 * @param   {T | number} value - The value to check.
 * @returns {boolean} `true` if the value is not an integer, otherwise `false`.
 * @see     {@link isInteger}
 * @see     {@link nonNumber}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonInteger<T>(value: T | number): value is T {
  return !isInteger(value);
}
