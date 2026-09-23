import { IllegalArgumentException } from "../../exception";
import { isArray } from "./isArray";

/**
 * Ensures that the provided value is NOT an `Array`, throwing an exception otherwise.
 *
 * The inverse of {@link requireArray}. Useful where a single value is expected
 * and receiving a list would otherwise be processed as one opaque item.
 *
 * @example
 * ```javascript
 * requireNonArray(42);       // => 42
 * requireNonArray("abc");    // => "abc"
 * requireNonArray([1, 2]);   // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the array case is excluded.
 * @param    {T | unknown[]} value - The value to validate as a non-array.
 * @param    {string} [message="Expected a non-array value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is an `Array`.
 * @see      {@link isArray}
 * @see      {@link nonArray}
 * @see      {@link requireArray}
 * @see      [requireNonArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonArray.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonArray<T>(
  value: T | unknown[],
  message: string = "Expected a non-array value."
): T {
  if (isArray(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
