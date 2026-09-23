import { IllegalArgumentException } from "../../exception";
import { isBoolean } from "./isBoolean";

/**
 * Ensures that the provided value is a boolean, throwing an exception otherwise.
 *
 * The check is strict: only the primitives `true` and `false` qualify. Truthy
 * and falsy stand-ins such as `1`, `0` or `"true"` are rejected.
 *
 * @example
 * ```javascript
 * requireBoolean(true);    // => true
 * requireBoolean(false);   // => false
 * requireBoolean(1);       // Throws IllegalArgumentException
 * requireBoolean("true");  // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a boolean.
 * @param   {string} [message="Expected a boolean."] - Optional custom error message if the validation fails.
 * @returns {boolean} The validated boolean.
 * @throws  {@link IllegalArgumentException} If the value is not a boolean.
 * @see     {@link isBoolean}
 * @see     {@link nonBoolean}
 * @see     [requireBoolean on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireBoolean.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireBoolean(value: unknown, message: string = "Expected a boolean."): boolean {
  if (!isBoolean(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
