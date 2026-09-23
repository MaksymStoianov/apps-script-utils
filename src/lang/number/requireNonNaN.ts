import { IllegalArgumentException } from "../../exception";
import { isNaN } from "./isNaN";

/**
 * Ensures that the provided value is NOT the `NaN` number, throwing an
 * exception otherwise.
 *
 * This is the guard for arithmetic that may quietly produce `NaN` — a parse
 * that failed, a division of zero by zero — before the value travels any
 * further. Mirrors {@link isNaN} and does not coerce, so a string, `null` or
 * `undefined` passes, even though the global `isNaN` reports each of them as
 * `NaN` after conversion.
 *
 * @example
 * ```javascript
 * requireNonNaN(42);         // => 42
 * requireNonNaN(Infinity);   // => Infinity
 * requireNonNaN("abc");      // => "abc" (the global isNaN returns true)
 * requireNonNaN(NaN);        // Throws IllegalArgumentException
 * requireNonNaN(0 / 0);      // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the `NaN` case is excluded.
 * @param    {T | number} value - The value to validate as anything but `NaN`.
 * @param    {string} [message="Expected a value that is not NaN."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is the `NaN` number.
 * @see      {@link isNaN}
 * @see      {@link nonNaN}
 * @see      {@link requireNaN}
 * @see      [requireNonNaN on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonnan.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonNaN<T>(
  value: T | number,
  message: string = "Expected a value that is not NaN."
): T {
  if (isNaN(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T;
}
