import { IllegalArgumentException } from "../../exception";
import { isInteger } from "./isInteger";

/**
 * Ensures that the provided value is NOT an integer, throwing an exception
 * otherwise.
 *
 * Mirrors {@link isInteger}, so a whole number is rejected however it was
 * written — `1.0` counts as an integer, because at runtime it is the same
 * value as `1`. Fractions, `NaN`, both infinities and every non-numeric value
 * pass.
 *
 * @example
 * ```javascript
 * requireNonInteger(1.5);     // => 1.5
 * requireNonInteger("42");    // => "42"
 * requireNonInteger(NaN);     // => NaN
 * requireNonInteger(42);      // Throws IllegalArgumentException
 * requireNonInteger(1.0);     // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the integer case is excluded.
 * @param    {T | number} value - The value to validate as a non-integer.
 * @param    {string} [message="Expected a value that is not an integer."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is an integer.
 * @see      {@link isInteger}
 * @see      {@link nonInteger}
 * @see      {@link requireInteger}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonInteger<T>(
  value: T | number,
  message: string = "Expected a value that is not an integer."
): T {
  if (isInteger(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T;
}
