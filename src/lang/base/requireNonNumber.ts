import { IllegalArgumentException } from "../../exception";
import { isNumber } from "./isNumber";

/**
 * Ensures that the provided value is NOT a number, throwing an exception otherwise.
 *
 * Mirrors {@link isNumber}, so `NaN` and both infinities count as numbers and
 * are rejected.
 *
 * @example
 * ```javascript
 * requireNonNumber("42");   // => "42"
 * requireNonNumber(null);   // => null
 * requireNonNumber(42);     // Throws IllegalArgumentException
 * requireNonNumber(NaN);    // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the number case is excluded.
 * @param    {T | number} value - The value to validate as a non-number.
 * @param    {string} [message="Expected a non-numeric value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a number.
 * @see      {@link isNumber}
 * @see      {@link nonNumber}
 * @see      {@link requireNumber}
 * @see      [requireNonNumber on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonNumber.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonNumber<T>(
  value: T | number,
  message: string = "Expected a non-numeric value."
): T {
  if (isNumber(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
