import { IllegalArgumentException } from "../../exception";
import { isUndefined } from "./isUndefined";

/**
 * Ensures that the provided value is `undefined`, throwing an exception otherwise.
 *
 * `null` does not qualify — see {@link requireNil} for the check that accepts
 * both.
 *
 * @example
 * ```javascript
 * requireUndefined(undefined);   // => undefined
 * requireUndefined(null);        // Throws IllegalArgumentException
 * requireUndefined(0);           // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as `undefined`.
 * @param   {string} [message="Expected undefined."] - Optional custom error message if the validation fails.
 * @returns {undefined} The validated `undefined` value.
 * @throws  {@link IllegalArgumentException} If the value is not `undefined`.
 * @see     {@link isUndefined}
 * @see     {@link nonUndefined}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireUndefined(
  value: unknown,
  message: string = "Expected undefined."
): undefined {
  if (!isUndefined(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
