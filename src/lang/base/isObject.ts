import { nonNil } from "./nonNil";

/**
 * Checks if `value` is the of `Object`.
 *
 * @example
 * ```javascript
 * isObject({}); // => true
 * isObject([]); // => true
 * isObject(new Date()); // => true
 * isObject(null); // => false
 * isObject("abc"); // => false
 * isObject(function () {}); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if `value` is an `Object`, else `false`.
 * @see     {@link isObjectLike}
 * @see     [isObject on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isObject.html)
 * @since   1.0.0
 * @version 1.1.0
 */
export function isObject(value: unknown): value is object {
  return nonNil(value) && typeof value === "object";
}
