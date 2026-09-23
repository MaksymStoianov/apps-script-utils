import { IllegalArgumentException } from "../../exception";
import { isEmpty } from "./isEmpty";

/**
 * Ensures that the provided value is empty, throwing an exception otherwise.
 *
 * Emptiness follows {@link isEmpty}: nil values, empty strings, empty arrays,
 * empty `Set` and `Map` objects, and plain objects without enumerable
 * properties. Numbers and booleans are never empty, not even `0` and `false`.
 *
 * @example
 * ```javascript
 * requireEmpty([]);       // => []
 * requireEmpty("   ");    // => "   " (blank counts as empty by default)
 * requireEmpty("   ", undefined, true); // Throws: strict mode
 * requireEmpty([1]);      // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value being checked.
 * @param    {T} value - The value to validate as empty.
 * @param    {string} [message="Expected an empty value."] - Optional custom error message if the validation fails.
 * @param    {boolean} [strict=false] - The strictness mode for string validation, forwarded to {@link isEmpty}.
 * @returns  {T} The validated empty value.
 * @throws   {@link IllegalArgumentException} If the value is not empty.
 * @see      {@link isEmpty}
 * @see      {@link nonEmpty}
 * @see      [requireEmpty on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireEmpty.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireEmpty<T>(
  value: T,
  message: string = "Expected an empty value.",
  strict: boolean = false
): T {
  if (!isEmpty(value, strict)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
