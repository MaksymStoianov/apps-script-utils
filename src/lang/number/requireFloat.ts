import { IllegalArgumentException } from "../../exception";
import { isFloat } from "./isFloat";

/**
 * Ensures that the provided value is a finite number carrying a fractional
 * part, throwing an exception otherwise.
 *
 * JavaScript has a single numeric type, so `1.0` and `1` are the same value:
 * `1.0` is rejected, because there is no fractional part left to observe at
 * runtime.
 *
 * @example
 * ```javascript
 * requireFloat(1.5);                             // => 1.5
 * requireFloat(-0.1);                            // => -0.1
 * requireFloat(42);                              // Throws IllegalArgumentException
 * requireFloat(Infinity);                        // Throws IllegalArgumentException
 * requireFloat("1.5", "Rate must be a decimal.") // Throws with that message
 * ```
 *
 * @param   {unknown} value - The value to validate as a fractional number.
 * @param   {string} [message="Expected a number with a fractional part."] - Optional custom error message if the validation fails.
 * @returns {number} The validated fractional number.
 * @throws  {@link IllegalArgumentException} If the value is not a fractional number.
 * @see     {@link isFloat}
 * @see     {@link nonFloat}
 * @see     [requireFloat on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirefloat.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireFloat(
  value: unknown,
  message: string = "Expected a number with a fractional part."
): number {
  if (!isFloat(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
