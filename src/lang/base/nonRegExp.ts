import { isRegExp } from "./isRegExp";

/**
 * Checks if the provided value is NOT a regular expression.
 *
 * @template T
 * @param   {T | RegExp} value - The value to check.
 * @returns {boolean} `true` if the value is not a regular expression (`RegExp` object); otherwise, `false`.
 * @see     {@link isRegExp}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonRegExp<T>(value: T | RegExp): value is T {
  return !isRegExp(value);
}
