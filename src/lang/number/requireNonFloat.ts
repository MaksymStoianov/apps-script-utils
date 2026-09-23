import { IllegalArgumentException } from "../../exception";
import { isFloat } from "./isFloat";

/**
 * Ensures that the provided value is NOT a finite number carrying a fractional
 * part, throwing an exception otherwise.
 *
 * Mirrors {@link isFloat}, so integers, `NaN`, both infinities and every
 * non-numeric value pass: none of them carries an observable fraction.
 *
 * @example
 * ```javascript
 * requireNonFloat(42);        // => 42
 * requireNonFloat(1.0);       // => 1 (identical to 1 at runtime)
 * requireNonFloat("1.5");     // => "1.5"
 * requireNonFloat(1.5);       // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the fractional number case is excluded.
 * @param    {T | number} value - The value to validate as a non-fractional value.
 * @param    {string} [message="Expected a value without a fractional part."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a fractional number.
 * @see      {@link isFloat}
 * @see      {@link nonFloat}
 * @see      {@link requireFloat}
 * @see      [requireNonFloat on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonfloat.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonFloat<T>(
  value: T | number,
  message: string = "Expected a value without a fractional part."
): T {
  if (isFloat(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T;
}
