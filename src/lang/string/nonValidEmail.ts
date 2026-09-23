import { isEmail } from "./isEmail";

/**
 * Checks if the provided value is NOT a valid email address.
 *
 * @example
 * ```javascript
 * nonValidEmail("user@@example.com"); // => true
 * nonValidEmail("user@"); // => true
 * nonValidEmail("example.com"); // => true
 * nonValidEmail(""); // => true
 * nonValidEmail("user@example.com"); // => false
 * nonValidEmail("first.last@sub.example.co.uk"); // => false
 * ```
 *
 * @template T
 * @param   {T | string} value - The value to check.
 * @returns {boolean} `true` if the value is not a valid email address; otherwise, `false`.
 * @see     {@link isEmail}
 * @see     {@link requireValidEmail}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidEmail<T>(value: T | string): value is T {
  return !isEmail(value);
}
