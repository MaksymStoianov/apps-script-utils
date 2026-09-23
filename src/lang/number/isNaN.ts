import { isNumber } from "../base";

/**
 * Checks if a value is the `NaN` number.
 *
 * Unlike the global `isNaN`, this function does not coerce its argument: a
 * value only qualifies if it is already a number and that number is `NaN`.
 * The global `isNaN("abc")` returns `true` because the string is converted
 * first, which makes it unusable as a type check.
 *
 * @example
 * ```javascript
 * isNaN(NaN);          // => true
 * isNaN(0 / 0);        // => true
 * isNaN("abc");        // => false (the global isNaN returns true)
 * isNaN(undefined);    // => false (the global isNaN returns true)
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is the `NaN` number, otherwise `false`.
 * @see     {@link isNumber}
 * @see     [isNaN on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isnan.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function isNaN(value: unknown): boolean {
  return isNumber(value) && Number.isNaN(value);
}
