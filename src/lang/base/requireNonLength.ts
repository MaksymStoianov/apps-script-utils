import { IllegalArgumentException } from "../../exception";
import { isLength } from "./isLength";

/**
 * Ensures that the provided value is NOT a valid array-like length,
 * throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireNonLength(-1);     // => -1
 * requireNonLength(1.5);    // => 1.5
 * requireNonLength("abc");  // => "abc"
 * requireNonLength(10);     // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value.
 * @param    {T} value - The value to validate as a non-length.
 * @param    {string} [message="Expected a value that is not a valid array-like length."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a valid length.
 * @see      {@link isLength}
 * @see      {@link nonLength}
 * @see      {@link requireLength}
 * @see      [requireNonLength on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonlength.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonLength<T>(
  value: T,
  message: string = "Expected a value that is not a valid array-like length."
): T {
  if (isLength(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
