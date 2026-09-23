import { isObjectLike } from "./isObjectLike";

/**
 * Checks if `value` is NOT an object in a broader sense.
 *
 * @example
 * ```javascript
 * nonObjectLike(null); // => true
 * nonObjectLike("abc"); // => true
 * nonObjectLike(1); // => true
 * nonObjectLike({}); // => false
 * nonObjectLike([]); // => false
 * nonObjectLike(function () {}); // => false
 * ```
 *
 * @template T
 * @param   {T | object} value - The value to check.
 * @returns {boolean} `true` if `value` is not an `Object`, else `false`.
 * @see     {@link isObjectLike}
 * @see     {@link nonObject}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonObjectLike<T>(value: T | object): value is T {
  return !isObjectLike(value);
}
