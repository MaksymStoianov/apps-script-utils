import { IllegalArgumentException } from "../../exception";
import { isFunction } from "./isFunction";

/**
 * Ensures that the provided value is a function, throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * requireFunction(() => {});   // => the same function
 * requireFunction(Array);      // => Array
 * requireFunction("fn");       // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a function.
 * @param   {string} [message="Expected a function."] - Optional custom error message if the validation fails.
 * @returns {Function} The validated function.
 * @throws  {@link IllegalArgumentException} If the value is not a function.
 * @see     {@link isFunction}
 * @see     {@link nonFunction}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireFunction(
  value: unknown,
  message: string = "Expected a function."
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): Function {
  if (!isFunction(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
