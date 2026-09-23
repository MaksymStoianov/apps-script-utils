import { isNumber } from "../base";

/**
 * Checks if a value is a number and an integer.
 *
 * @example
 * ```javascript
 * isInteger(42); // => true
 * isInteger(-7); // => true
 * isInteger(0); // => true
 * isInteger(1.5); // => false
 * isInteger(NaN); // => false
 * isInteger("42"); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an integer, otherwise `false`.
 * @see     {@link isNumber}
 * @see     [isInteger on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isInteger.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}
