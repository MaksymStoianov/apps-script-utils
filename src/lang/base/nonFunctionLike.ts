import { isFunctionLike } from "./isFunctionLike";

/**
 * Checks if the provided value is NOT a function in a broader sense.
 *
 * @example
 * ```javascript
 * nonFunctionLike(null); // => true
 * nonFunctionLike({}); // => true
 * nonFunctionLike("fn"); // => true
 * nonFunctionLike(function () {}); // => false
 * nonFunctionLike(Math.max); // => false
 * ```
 *
 * @template T
 * @param   {T | Function} value - The value to check.
 * @returns {boolean} `true` if the value is not a function; otherwise, `false`.
 * @see     {@link isFunctionLike}
 * @see     {@link nonFunction}
 * @see     [nonFunctionLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonfunctionlike.html)
 * @since   1.11.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function nonFunctionLike<T>(value: T | Function): value is T {
  return !isFunctionLike(value);
}
