import { IllegalArgumentException } from "../../exception";
import { isNil } from "./isNil";

/**
 * Ensures that the provided value is `null` or `undefined`,
 * throwing an exception otherwise.
 *
 * The inverse of {@link requireNonNull}. Use {@link requireNull} or
 * {@link requireUndefined} when only one of the two is acceptable.
 *
 * @example
 * ```javascript
 * requireNil(null);        // => null
 * requireNil(undefined);   // => undefined
 * requireNil(0);           // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as `null` or `undefined`.
 * @param   {string} [message="Expected null or undefined."] - Optional custom error message if the validation fails.
 * @returns {null | undefined} The validated nil value.
 * @throws  {@link IllegalArgumentException} If the value is neither `null` nor `undefined`.
 * @see     {@link isNil}
 * @see     {@link nonNil}
 * @see     {@link requireNonNull}
 * @see     [requireNil on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNil.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireNil(
  value: unknown,
  message: string = "Expected null or undefined."
): null | undefined {
  if (!isNil(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
