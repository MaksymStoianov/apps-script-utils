import { IllegalArgumentException } from "../../exception";
import { isNumber } from "./isNumber";

/**
 * Ensures that the provided value is a number, throwing an exception otherwise.
 *
 * The check mirrors {@link isNumber}, so `NaN` and both infinities qualify:
 * they are numbers. Use {@link requireInteger} when a whole number is needed,
 * or {@link requireCountable} for a quantity.
 *
 * @example
 * ```javascript
 * requireNumber(42);     // => 42
 * requireNumber(1.5);    // => 1.5
 * requireNumber("42");   // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a number.
 * @param   {string} [message="Expected a number."] - Optional custom error message if the validation fails.
 * @returns {number} The validated number.
 * @throws  {@link IllegalArgumentException} If the value is not a number.
 * @see     {@link isNumber}
 * @see     {@link nonNumber}
 * @see     {@link requireInteger}
 * @see     [requireNumber on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNumber.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireNumber(value: unknown, message: string = "Expected a number."): number {
  if (!isNumber(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
