import { IllegalArgumentException } from "../../exception";
import { isNumberLike } from "./isNumberLike";

/**
 * Ensures that the provided value is a number in a broader sense,
 * throwing an exception otherwise.
 *
 * Accepts a finite `number` or a `string` that parses to one. The value is
 * returned **as it came in**, without conversion: use `Number(value)` on the
 * result when an actual number is needed.
 *
 * @example
 * ```javascript
 * requireNumberLike(42);      // => 42
 * requireNumberLike("42");    // => "42" (a string, not 42)
 * requireNumberLike("42px");  // Throws IllegalArgumentException
 * requireNumberLike(NaN);     // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a number in a broader sense.
 * @param   {string} [message="Expected a numeric value."] - Optional custom error message if the validation fails.
 * @returns {number | string} The validated value, unconverted.
 * @throws  {@link IllegalArgumentException} If the value is not numeric.
 * @see     {@link isNumberLike}
 * @see     {@link nonNumberLike}
 * @see     {@link requireNumber}
 * @see     [requireNumberLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenumberlike.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireNumberLike(
  value: unknown,
  message: string = "Expected a numeric value."
): number | string {
  if (!isNumberLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as number | string;
}
