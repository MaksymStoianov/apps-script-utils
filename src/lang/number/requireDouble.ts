import { IllegalArgumentException } from "../../exception";
import { isDouble } from "./isDouble";

/**
 * Ensures that the provided value is a finite number carrying a fractional
 * part, throwing an exception otherwise.
 *
 * A synonym of {@link requireFloat}, mirroring {@link isDouble}. A decimal
 * literal without a fraction is rejected along with integers, `NaN` and the
 * infinities: at runtime `1.0` is the same value as `1`.
 *
 * @example
 * ```javascript
 * requireDouble(1.5);                            // => 1.5
 * requireDouble(42);                             // Throws IllegalArgumentException
 * requireDouble(1.0);                            // Throws IllegalArgumentException
 * requireDouble("1.5", "Rate must be decimal."); // Throws with that message
 * ```
 *
 * @param   {unknown} value - The value to validate as a fractional number.
 * @param   {string} [message="Expected a number with a fractional part."] - Optional custom error message if the validation fails.
 * @returns {number} The validated fractional number.
 * @throws  {@link IllegalArgumentException} If the value is not a fractional number.
 * @see     {@link isDouble}
 * @see     {@link nonDouble}
 * @see     {@link requireFloat}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireDouble(
  value: unknown,
  message: string = "Expected a number with a fractional part."
): number {
  if (!isDouble(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
