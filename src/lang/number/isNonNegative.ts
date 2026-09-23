import { isNumber } from "../base";

/**
 * Checks if a value is a number greater than or equal to zero.
 *
 * `NaN` does not qualify: it is a number, but it is neither negative nor
 * non-negative. Both infinities behave as their sign suggests, so
 * `Infinity` qualifies and `-Infinity` does not.
 *
 * @example
 * ```javascript
 * isNonNegative(0);         // => true
 * isNonNegative(-0);        // => true
 * isNonNegative(-1);        // => false
 * isNonNegative(NaN);       // => false
 * isNonNegative("1");       // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a number and is not negative; otherwise, `false`.
 * @see     {@link isCountable}
 * @see     {@link isNumber}
 * @see     [isNonNegative on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isnonnegative.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function isNonNegative(value: unknown): value is number {
  return isNumber(value) && !Number.isNaN(value) && value >= 0;
}
