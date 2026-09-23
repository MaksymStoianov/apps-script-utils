import { IllegalArgumentException } from "../../exception";
import { isRegExp } from "./isRegExp";

/**
 * Ensures that the provided value is NOT a regular expression,
 * throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireNonRegExp("abc");   // => "abc"
 * requireNonRegExp(/abc/);   // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the `RegExp` case is excluded.
 * @param    {T | RegExp} value - The value to validate as a non-`RegExp`.
 * @param    {string} [message="Expected a value that is not a regular expression."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a `RegExp` object.
 * @see      {@link isRegExp}
 * @see      {@link nonRegExp}
 * @see      {@link requireRegExp}
 * @see      [requireNonRegExp on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonRegExp.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonRegExp<T>(
  value: T | RegExp,
  message: string = "Expected a value that is not a regular expression."
): T {
  if (isRegExp(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
