import { IllegalArgumentException } from "../../exception";
import { isSafeInteger } from "./isSafeInteger";

/**
 * Ensures that the provided value is a safe integer, throwing an exception
 * otherwise.
 *
 * A safe integer lies within `Number.MIN_SAFE_INTEGER` and
 * `Number.MAX_SAFE_INTEGER` inclusive. Beyond that range distinct
 * mathematical integers collapse onto the same value, so arithmetic silently
 * stops being exact — which is why an identifier or a counter is worth
 * checking before it is used.
 *
 * @example
 * ```javascript
 * requireSafeInteger(42);                         // => 42
 * requireSafeInteger(Number.MAX_SAFE_INTEGER);    // => 9007199254740991
 * requireSafeInteger(Number.MAX_SAFE_INTEGER + 2) // Throws IllegalArgumentException
 * requireSafeInteger(1.5);                        // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a safe integer.
 * @param   {string} [message="Expected a safe integer."] - Optional custom error message if the validation fails.
 * @returns {number} The validated safe integer.
 * @throws  {@link IllegalArgumentException} If the value is not a safe integer.
 * @see     {@link isSafeInteger}
 * @see     {@link nonSafeInteger}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireSafeInteger(
  value: unknown,
  message: string = "Expected a safe integer."
): number {
  if (!isSafeInteger(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
