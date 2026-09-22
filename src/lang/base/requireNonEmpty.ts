import { IllegalArgumentException } from "../../exception";
import { isEmpty } from "./isEmpty";

/**
 * Ensures that the provided value is not empty, throwing an exception otherwise.
 *
 * Emptiness follows {@link isEmpty}: nil values, empty strings, empty arrays,
 * empty `Set` and `Map` objects, and plain objects without enumerable
 * properties. Numbers and booleans are never empty, so `0` and `false` pass.
 *
 * @example
 * ```javascript
 * requireNonEmpty([1]);      // => [1]
 * requireNonEmpty(0);        // => 0 (numbers are never empty)
 * requireNonEmpty([]);       // Throws IllegalArgumentException
 * requireNonEmpty("   ");    // Throws: blank counts as empty by default
 * ```
 *
 * @template T - The type of the value being checked.
 * @param    {T} value - The value to validate as non-empty.
 * @param    {string} [message="Expected a non-empty value."] - Optional custom error message if the validation fails.
 * @param    {boolean} [strict=false] - The strictness mode for string validation, forwarded to {@link isEmpty}.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is empty.
 * @see      {@link isEmpty}
 * @see      {@link nonEmpty}
 * @see      {@link requireEmpty}
 * @see      {@link requireNonEmptyString}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonEmpty<T>(
  value: T,
  message: string = "Expected a non-empty value.",
  strict: boolean = false
): T {
  if (isEmpty(value, strict)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
