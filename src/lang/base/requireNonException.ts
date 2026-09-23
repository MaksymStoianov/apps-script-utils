import { Exception, IllegalArgumentException } from "../../exception";
import { isException } from "./isException";

/**
 * Ensures that the provided value is NOT an {@link Exception} (or a subclass),
 * throwing an exception otherwise.
 *
 * Native `Error` objects pass: the check covers this library's exception
 * hierarchy only.
 *
 * @example
 * ```javascript
 * requireNonException({ ok: true });              // => { ok: true }
 * requireNonException(new Error("boom"));         // => the same Error
 * requireNonException(new RuntimeException());    // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the exception case is excluded.
 * @param    {T | Exception} value - The value to validate as a non-exception.
 * @param    {string} [message="Expected a value that is not an Exception."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is an {@link Exception}.
 * @see      {@link isException}
 * @see      {@link nonException}
 * @see      {@link requireException}
 * @see      [requireNonException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonException.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonException<T>(
  value: T | Exception,
  message: string = "Expected a value that is not an Exception."
): T {
  if (isException(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
