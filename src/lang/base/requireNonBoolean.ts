import { IllegalArgumentException } from "../../exception";
import { isBoolean } from "./isBoolean";

/**
 * Ensures that the provided value is NOT a boolean, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireNonBoolean("yes");   // => "yes"
 * requireNonBoolean(1);       // => 1
 * requireNonBoolean(true);    // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the boolean case is excluded.
 * @param    {T | boolean} value - The value to validate as a non-boolean.
 * @param    {string} [message="Expected a non-boolean value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a boolean.
 * @see      {@link isBoolean}
 * @see      {@link nonBoolean}
 * @see      {@link requireBoolean}
 * @see      [requireNonBoolean on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonBoolean.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonBoolean<T>(
  value: T | boolean,
  message: string = "Expected a non-boolean value."
): T {
  if (isBoolean(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
