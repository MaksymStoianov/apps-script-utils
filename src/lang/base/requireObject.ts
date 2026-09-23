import { IllegalArgumentException } from "../../exception";
import { isObject } from "./isObject";

/**
 * Ensures that the provided value is an `Object`, throwing an exception otherwise.
 *
 * Mirrors {@link isObject}: arrays, dates and other built-in object types
 * qualify, while `null` and functions do not. Use {@link requireObjectLike}
 * when functions should be accepted as well.
 *
 * @example
 * ```javascript
 * requireObject({ a: 1 });   // => { a: 1 }
 * requireObject([1, 2]);     // => [1, 2]
 * requireObject(null);       // Throws IllegalArgumentException
 * requireObject(() => {});   // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as an `Object`.
 * @param   {string} [message="Expected an object."] - Optional custom error message if the validation fails.
 * @returns {object} The validated object.
 * @throws  {@link IllegalArgumentException} If the value is not an `Object`.
 * @see     {@link isObject}
 * @see     {@link nonObject}
 * @see     [requireObject on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireobject.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireObject(value: unknown, message: string = "Expected an object."): object {
  if (!isObject(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
