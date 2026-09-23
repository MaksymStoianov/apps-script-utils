import { IllegalArgumentException } from "../../exception";
import { isDouble } from "./isDouble";

/**
 * Ensures that the provided value is NOT a finite number carrying a fractional
 * part, throwing an exception otherwise.
 *
 * A synonym of {@link requireNonFloat}, mirroring {@link isDouble}. Integers,
 * `NaN`, both infinities and every non-numeric value pass, because none of
 * them carries an observable fraction.
 *
 * @example
 * ```javascript
 * requireNonDouble(42);     // => 42
 * requireNonDouble(1.0);    // => 1 (identical to 1 at runtime)
 * requireNonDouble("1.5");  // => "1.5"
 * requireNonDouble(1.5);    // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the fractional number case is excluded.
 * @param    {T | number} value - The value to validate as a non-fractional value.
 * @param    {string} [message="Expected a value without a fractional part."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a fractional number.
 * @see      {@link isDouble}
 * @see      {@link nonDouble}
 * @see      {@link requireNonFloat}
 * @see      [requireNonDouble on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenondouble.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonDouble<T>(
  value: T | number,
  message: string = "Expected a value without a fractional part."
): T {
  if (isDouble(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T;
}
