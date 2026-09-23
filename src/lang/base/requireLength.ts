import { IllegalArgumentException } from "../../exception";
import { isLength } from "./isLength";

/**
 * Ensures that the provided value is a valid array-like length,
 * throwing an exception otherwise.
 *
 * A valid length is an integer from `0` up to `Number.MAX_SAFE_INTEGER`.
 *
 * @example
 * ```javascript
 * requireLength(0);    // => 0
 * requireLength(10);   // => 10
 * requireLength(-1);   // Throws IllegalArgumentException
 * requireLength(1.5);  // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a length.
 * @param   {string} [message="Expected a valid array-like length."] - Optional custom error message if the validation fails.
 * @returns {number} The validated length.
 * @throws  {@link IllegalArgumentException} If the value is not a valid length.
 * @see     {@link isLength}
 * @see     {@link nonLength}
 * @see     [requireLength on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireLength.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireLength(
  value: unknown,
  message: string = "Expected a valid array-like length."
): number {
  if (!isLength(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as number;
}
