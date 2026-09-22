import { Exception } from "../../exception";
import { isException } from "./isException";

/**
 * Checks if the provided value is NOT an instance of {@link Exception} or a class that extends it.
 *
 * @example
 * ```javascript
 * nonException(new Error()); // => true
 * nonException({}); // => true
 * nonException(null); // => true
 * nonException(new IllegalArgumentException()); // => false
 * ```
 *
 * @template T
 * @param   {T | Exception} value - The value to check.
 * @returns {boolean} `true` if the value is not an instance of {@link Exception} (or a subclass); otherwise, `false`.
 * @see     {@link isException}
 * @see     {@link Exception}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonException<T>(value: T | Exception): value is T {
  return !isException(value);
}
