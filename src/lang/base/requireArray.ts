import { IllegalArgumentException } from "../../exception";
import { isArray } from "./isArray";

/**
 * Ensures that the provided value is an `Array`, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireArray([1, 2, 3]);  // => [1, 2, 3]
 * requireArray([]);         // => []
 * requireArray("abc");      // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of elements within the array.
 * @param    {unknown} value - The value to validate as an `Array`.
 * @param    {string} [message="Expected an array."] - Optional custom error message if the validation fails.
 * @returns  {T[]} The validated array.
 * @throws   {@link IllegalArgumentException} If the value is not an `Array`.
 * @see      {@link isArray}
 * @see      {@link nonArray}
 * @see      [requireArray on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireArray.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireArray<T>(value: unknown, message: string = "Expected an array."): T[] {
  if (!isArray<T>(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
