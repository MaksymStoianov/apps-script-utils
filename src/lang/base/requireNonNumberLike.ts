import { IllegalArgumentException } from "../../exception";
import { isNumberLike } from "./isNumberLike";

/**
 * Ensures that the provided value is NOT numeric in a broader sense,
 * throwing an exception otherwise.
 *
 * Rejects finite numbers and strings that parse to one. Useful where a value
 * must not be mistakable for a number — a label or an identifier that a
 * spreadsheet would otherwise coerce.
 *
 * @example
 * ```javascript
 * requireNonNumberLike("abc");    // => "abc"
 * requireNonNumberLike(NaN);      // => NaN (a number, but not numeric)
 * requireNonNumberLike("42");     // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value.
 * @param    {T} value - The value to validate as non-numeric.
 * @param    {string} [message="Expected a non-numeric value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is numeric.
 * @see      {@link isNumberLike}
 * @see      {@link nonNumberLike}
 * @see      {@link requireNumberLike}
 * @see      [requireNonNumberLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonnumberlike.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonNumberLike<T>(
  value: T,
  message: string = "Expected a non-numeric value."
): T {
  if (isNumberLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
