import { IllegalArgumentException } from "../../exception";
import { isCountable } from "./isCountable";

/**
 * Ensures that the provided value is a countable number, throwing an exception otherwise.
 *
 * A countable value is a non-negative safe integer — the kind of number that
 * can serve as a quantity, a length or a zero-based index.
 *
 * @example
 * ```javascript
 * requireCountable(0);    // => 0
 * requireCountable(-1);   // Throws IllegalArgumentException
 * requireCountable(1.5);  // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a countable number.
 * @param   {string} [message="Expected a non-negative safe integer."] - Optional custom error message if the validation fails.
 * @returns {number} The validated countable number.
 * @throws  {@link IllegalArgumentException} If the value is not a countable number.
 * @see     {@link isCountable}
 * @see     {@link nonCountable}
 * @see     [requireCountable on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirecountable.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireCountable(
  value: unknown,
  message: string = "Expected a non-negative safe integer."
): number {
  if (!isCountable(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
