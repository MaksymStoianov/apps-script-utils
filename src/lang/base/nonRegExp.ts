import { isRegExp } from "./isRegExp";

/**
 * Checks if the provided value is NOT a regular expression.
 *
 * @example
 * ```javascript
 * nonRegExp("/a/"); // => true
 * nonRegExp({}); // => true
 * nonRegExp(null); // => true
 * nonRegExp(/a/); // => false
 * nonRegExp(new RegExp("a")); // => false
 * ```
 *
 * @template T
 * @param   {T | RegExp} value - The value to check.
 * @returns {boolean} `true` if the value is not a regular expression (`RegExp` object); otherwise, `false`.
 * @see     {@link isRegExp}
 * @see     [nonRegExp on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonRegExp.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonRegExp<T>(value: T | RegExp): value is T {
  return !isRegExp(value);
}
