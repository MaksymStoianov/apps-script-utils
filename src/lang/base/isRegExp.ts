import { ObjectTag, objectToString } from "../object";

/**
 * Checks if the provided value is a regular expression.
 *
 * @example
 * ```javascript
 * isRegExp(/a/); // => true
 * isRegExp(new RegExp("a")); // => true
 * isRegExp("/a/"); // => false
 * isRegExp({}); // => false
 * isRegExp(null); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a regular expression (`RegExp` object); otherwise, `false`.
 * @see [isRegExp on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isRegExp.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isRegExp(value: unknown): value is RegExp {
  return objectToString(value) === ObjectTag.REG_EXP;
}
