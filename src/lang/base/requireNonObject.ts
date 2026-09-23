import { IllegalArgumentException } from "../../exception";
import { isObject } from "./isObject";

/**
 * Ensures that the provided value is NOT an `Object`, throwing an exception otherwise.
 *
 * Mirrors {@link isObject}: arrays and other built-in object types are
 * rejected, while `null` and functions pass. Use {@link requireNonObjectLike}
 * when functions should be rejected too.
 *
 * @example
 * ```javascript
 * requireNonObject("abc");     // => "abc"
 * requireNonObject(null);      // => null
 * requireNonObject({ a: 1 });  // Throws IllegalArgumentException
 * requireNonObject([1]);       // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the object case is excluded.
 * @param    {T | object} value - The value to validate as a non-object.
 * @param    {string} [message="Expected a non-object value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is an `Object`.
 * @see      {@link isObject}
 * @see      {@link nonObject}
 * @see      {@link requireObject}
 * @see      [requireNonObject on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonobject.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonObject<T>(
  value: T | object,
  message: string = "Expected a non-object value."
): T {
  if (isObject(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
