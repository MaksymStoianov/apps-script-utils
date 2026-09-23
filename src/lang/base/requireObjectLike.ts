import { IllegalArgumentException } from "../../exception";
import { isObjectLike } from "./isObjectLike";

/**
 * Ensures that the provided value is an object in a broader sense,
 * throwing an exception otherwise.
 *
 * Accepts functions in addition to everything {@link requireObject} accepts,
 * since a function is an object in JavaScript. `null` is still rejected.
 *
 * @example
 * ```javascript
 * requireObjectLike({ a: 1 });   // => { a: 1 }
 * requireObjectLike(() => {});   // => the same function
 * requireObjectLike(null);       // Throws IllegalArgumentException
 * requireObjectLike("abc");      // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as an object.
 * @param   {string} [message="Expected an object."] - Optional custom error message if the validation fails.
 * @returns {object} The validated object.
 * @throws  {@link IllegalArgumentException} If the value is not object-like.
 * @see     {@link isObjectLike}
 * @see     {@link nonObjectLike}
 * @see     {@link requireObject}
 * @see     [requireObjectLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireObjectLike.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireObjectLike(value: unknown, message: string = "Expected an object."): object {
  if (!isObjectLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
