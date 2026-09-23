import { IllegalArgumentException } from "../../exception";
import { isUndefined } from "./isUndefined";

/**
 * Ensures that the provided value is NOT `undefined`, throwing an exception otherwise.
 *
 * `null` passes: it is an explicitly set absence, not a missing value. Use
 * {@link requireNonNull} when neither is acceptable.
 *
 * @example
 * ```javascript
 * requireNonUndefined(0);           // => 0
 * requireNonUndefined(null);        // => null
 * requireNonUndefined(undefined);   // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once `undefined` is excluded.
 * @param    {T | undefined} value - The value to validate as defined.
 * @param    {string} [message="Expected a defined value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is `undefined`.
 * @see      {@link isUndefined}
 * @see      {@link nonUndefined}
 * @see      {@link requireNonNull}
 * @see      [requireNonUndefined on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonUndefined.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonUndefined<T>(
  value: T | undefined,
  message: string = "Expected a defined value."
): T {
  if (isUndefined(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
