import { NullPointerException } from "../../exception";
import { isNil } from "./isNil";

/**
 * Ensures that the provided object is not `null` or `undefined`.
 *
 * @example
 * ```javascript
 * requireNonNull(0); // => 0
 * requireNonNull(""); // => ""
 * requireNonNull(null); // throws NullPointerException
 * requireNonNull(undefined); // throws NullPointerException
 * ```
 *
 * @template T - The type of the object being checked.
 * @param    {T | null | undefined} value the object to validate.
 * @param    {string} [message]
 * @returns  {T} The same object, guaranteed to be non-null and non-undefined.
 * @throws   {NullPointerException}
 * @see      {@link nonNull}
 * @see      {@link isNull}
 * @see      [requireNonNull on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirenonnull.html)
 * @since    1.0.0
 * @version  1.0.0
 */
export function requireNonNull<T>(value?: T | null | undefined, message?: string): T {
  if (isNil(value)) {
    throw new NullPointerException(message);
  }

  return value;
}
