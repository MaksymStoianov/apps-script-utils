import { IllegalArgumentException } from "../../exception";
import { isNaN } from "./isNaN";

/**
 * Ensures that the provided value is the `NaN` number, throwing an exception
 * otherwise.
 *
 * Mirrors {@link isNaN} and does not coerce its argument: a string, `null` or
 * `undefined` is rejected, even though the global `isNaN` reports each of them
 * as `NaN` after conversion.
 *
 * @example
 * ```javascript
 * requireNaN(NaN);        // => NaN
 * requireNaN(0 / 0);      // => NaN
 * requireNaN(42);         // Throws IllegalArgumentException
 * requireNaN("abc");      // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as the `NaN` number.
 * @param   {string} [message="Expected NaN."] - Optional custom error message if the validation fails.
 * @returns {number} The validated `NaN` value.
 * @throws  {@link IllegalArgumentException} If the value is not the `NaN` number.
 * @see     {@link isNaN}
 * @see     {@link nonNaN}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireNaN(value: unknown, message: string = "Expected NaN."): number {
  if (!isNaN(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as number;
}
