import { IllegalArgumentException } from "../../exception";
import { isRegExp } from "./isRegExp";

/**
 * Ensures that the provided value is a regular expression, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireRegExp(/abc/);              // => /abc/
 * requireRegExp(new RegExp("abc"));  // => /abc/
 * requireRegExp("/abc/");            // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a regular expression.
 * @param   {string} [message="Expected a regular expression."] - Optional custom error message if the validation fails.
 * @returns {RegExp} The validated regular expression.
 * @throws  {@link IllegalArgumentException} If the value is not a `RegExp` object.
 * @see     {@link isRegExp}
 * @see     {@link nonRegExp}
 * @see     [requireRegExp on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireRegExp.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireRegExp(
  value: unknown,
  message: string = "Expected a regular expression."
): RegExp {
  if (!isRegExp(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
