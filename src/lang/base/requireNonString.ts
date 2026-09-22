import { IllegalArgumentException } from "../../exception";
import { isString } from "./isString";

/**
 * Ensures that the provided value is NOT a string, throwing an exception otherwise.
 *
 * The inverse of {@link requireString}. Useful at a boundary where a raw,
 * unparsed string would silently do the wrong thing — a spreadsheet cell
 * holding `"42"` instead of `42`, for instance.
 *
 * @example
 * ```javascript
 * requireNonString(42);      // => 42
 * requireNonString(null);    // => null
 * requireNonString("42");    // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the string case is excluded.
 * @param    {T | string} value - The value to validate as a non-string.
 * @param    {string} [message="Expected a non-string value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a string.
 * @see      {@link isString}
 * @see      {@link nonString}
 * @see      {@link requireString}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonString<T>(
  value: T | string,
  message: string = "Expected a non-string value."
): T {
  if (isString(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
