import { IllegalArgumentException } from "../../exception";
import { isObjectLike } from "./isObjectLike";

/**
 * Ensures that the provided value is NOT an object in a broader sense,
 * throwing an exception otherwise.
 *
 * Stricter than {@link requireNonObject}: functions are object-like, so they
 * are rejected here and accepted there. `null` passes both.
 *
 * @example
 * ```javascript
 * requireNonObjectLike("abc");    // => "abc"
 * requireNonObjectLike(null);     // => null
 * requireNonObjectLike({ a: 1 }); // Throws IllegalArgumentException
 * requireNonObjectLike(() => {}); // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the object-like cases are excluded.
 * @param    {T | object} value - The value to validate as not object-like.
 * @param    {string} [message="Expected a non-object value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is object-like.
 * @see      {@link isObjectLike}
 * @see      {@link nonObjectLike}
 * @see      {@link requireObjectLike}
 * @see      {@link requireNonObject}
 * @see      [requireNonObjectLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonobjectlike.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonObjectLike<T>(
  value: T | object,
  message: string = "Expected a non-object value."
): T {
  if (isObjectLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
