import { IllegalArgumentException } from "../../exception";
import { isSafeInteger } from "./isSafeInteger";

/**
 * Ensures that the provided value is NOT a safe integer, throwing an exception
 * otherwise.
 *
 * Mirrors {@link isSafeInteger}, so a whole number within
 * `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER` inclusive is
 * rejected. Fractions, whole numbers beyond that range, `NaN`, both infinities
 * and every non-numeric value pass.
 *
 * @example
 * ```javascript
 * requireNonSafeInteger(1.5);                          // => 1.5
 * requireNonSafeInteger(Number.MAX_SAFE_INTEGER + 2);  // => 9007199254740994
 * requireNonSafeInteger("42");                         // => "42"
 * requireNonSafeInteger(42);                           // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the safe integer case is excluded.
 * @param    {T | number} value - The value to validate as a non-safe-integer.
 * @param    {string} [message="Expected a value that is not a safe integer."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a safe integer.
 * @see      {@link isSafeInteger}
 * @see      {@link nonSafeInteger}
 * @see      {@link requireSafeInteger}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonSafeInteger<T>(
  value: T | number,
  message: string = "Expected a value that is not a safe integer."
): T {
  if (isSafeInteger(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T;
}
