import { Exception, IllegalArgumentException } from "../../exception";
import { isException } from "./isException";

/**
 * Ensures that the provided value is an {@link Exception} (or a subclass),
 * throwing an exception otherwise.
 *
 * Native `Error` objects do not qualify: the check is for this library's
 * exception hierarchy, not for throwables in general.
 *
 * @example
 * ```javascript
 * requireException(new RuntimeException("boom"));  // => the same exception
 * requireException(new Error("boom"));             // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as an {@link Exception}.
 * @param   {string} [message="Expected an Exception."] - Optional custom error message if the validation fails.
 * @returns {Exception} The validated exception.
 * @throws  {@link IllegalArgumentException} If the value is not an {@link Exception}.
 * @see     {@link isException}
 * @see     {@link nonException}
 * @see     {@link Exception}
 * @see     [requireException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireException.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireException(
  value: unknown,
  message: string = "Expected an Exception."
): Exception {
  if (!isException(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
