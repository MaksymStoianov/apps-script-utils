import { isObject } from "./isObject";

/**
 * Checks if `value` is NOT of `Object`.
 *
 * @template T
 * @param   {T | object} value - The value to check.
 * @returns {boolean} `true` if `value` is not an `Object`, else `false`.
 * @see     {@link isObject}
 * @see     {@link nonObjectLike}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonObject<T>(value: T | object): value is T {
  return !isObject(value);
}
