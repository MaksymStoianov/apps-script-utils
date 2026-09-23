import { isNumber } from "../base";

/**
 * Checks if a value is a finite number carrying a fractional part.
 *
 * JavaScript has a single numeric type, so `1.0` and `1` are the same value:
 * this guard reports `false` for `1.0`, because there is no fractional part
 * left to observe at runtime. It answers "does this number have a fraction",
 * not "was this written as a decimal literal".
 *
 * @example
 * ```javascript
 * isFloat(1.5);       // => true
 * isFloat(-0.1);      // => true
 * isFloat(1.0);       // => false (identical to 1 at runtime)
 * isFloat(Infinity);  // => false
 * isFloat("1.5");     // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a finite number with a fractional part, otherwise `false`.
 * @see     {@link isInteger}
 * @see     {@link isNumber}
 * @see     [isFloat on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isFloat.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function isFloat(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value) && !Number.isInteger(value);
}
