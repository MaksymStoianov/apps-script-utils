import { IllegalArgumentException } from "../../exception";
import { isInteger } from "./isInteger";

/**
 * Ensures that the provided value is an integer, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireInteger(42);                          // => 42
 * requireInteger(1.5);                         // Throws IllegalArgumentException
 * requireInteger("42", "Row must be a whole number."); // Throws with that message
 * ```
 *
 * @param   {unknown} value - The value to validate as an integer.
 * @param   {string} [message="Expected an integer."] - Optional custom error message if the validation fails.
 * @returns {number} The validated integer.
 * @throws  {@link IllegalArgumentException} If the value is not an integer.
 * @see     {@link isInteger}
 * @see     {@link nonInteger}
 * @see     [requireInteger on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireinteger.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireInteger(value: unknown, message: string = "Expected an integer."): number {
  if (!isInteger(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
