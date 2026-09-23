import { isNumber } from "./isNumber";

/**
 * Checks if `value` is a valid array-like length.
 *
 * @example
 * ```javascript
 * isLength(0); // => true
 * isLength(42); // => true
 * isLength(Number.MAX_SAFE_INTEGER); // => true
 * isLength(-1); // => false
 * isLength(1.5); // => false
 * isLength("3"); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if `value` is a valid length, else `false`.
 * @see     https://lodash.com/docs/4.17.15#isLength
 * @see     [isLength on the documentation site](https://maksymstoianov.github.io/apps-script-utils/islength.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isLength(value: unknown): boolean {
  return isNumber(value) && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
}
