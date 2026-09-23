import { isNumberLike } from "./isNumberLike";

/**
 * Checks if the provided value is NOT a number in a broader sense.
 *
 * @example
 * ```javascript
 * nonNumberLike(NaN); // => true
 * nonNumberLike(Infinity); // => true
 * nonNumberLike(""); // => true
 * nonNumberLike(null); // => true
 * nonNumberLike(1); // => false
 * nonNumberLike("1.5"); // => false
 * nonNumberLike(" 42 "); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not a number; otherwise, `false`.
 * @see     {@link isNumberLike}
 * @see     {@link nonNumber}
 * @see     [nonNumberLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonNumberLike.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonNumberLike(value: unknown): boolean {
  return !isNumberLike(value);
}
