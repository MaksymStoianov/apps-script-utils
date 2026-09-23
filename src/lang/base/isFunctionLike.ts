import { nonNil } from "./nonNil";

/**
 * Checks if `value` is a function in a broader sense.
 *
 * @example
 * ```javascript
 * isFunctionLike(function () {}); // => true
 * isFunctionLike(Math.max); // => true
 * isFunctionLike(null); // => false
 * isFunctionLike({}); // => false
 * isFunctionLike("fn"); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a function; otherwise, `false`.
 * @see     {@link isFunction}
 * @see     [isFunctionLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isfunctionlike.html)
 * @since   1.2.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunctionLike(value: unknown): value is Function {
  return nonNil(value) && typeof value === "function";
}
