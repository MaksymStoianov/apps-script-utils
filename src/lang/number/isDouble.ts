import { isFloat } from "./isFloat";

/**
 * Checks if a value is a finite number carrying a fractional part.
 *
 * A synonym of {@link isFloat}, offered under the name people reach for first.
 * In JavaScript every number already is an IEEE-754 double, so `double` names
 * no runtime distinction of its own — the question this answers is whether the
 * number has a fraction, and `1.0` therefore does not qualify, being the same
 * value as `1`.
 *
 * @example
 * ```javascript
 * isDouble(1.5);       // => true
 * isDouble(-0.1);      // => true
 * isDouble(42);        // => false
 * isDouble(1.0);       // => false (identical to 1 at runtime)
 * isDouble(Infinity);  // => false
 * isDouble("1.5");     // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a finite number with a fractional part, otherwise `false`.
 * @see     {@link isFloat}
 * @see     {@link isInteger}
 * @see     [isDouble on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isdouble.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function isDouble(value: unknown): value is number {
  return isFloat(value);
}
