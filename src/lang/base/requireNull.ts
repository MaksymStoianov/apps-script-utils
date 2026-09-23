import { IllegalArgumentException } from "../../exception";
import { isNull } from "./isNull";

/**
 * Ensures that the provided value is `null`, throwing an exception otherwise.
 *
 * The inverse of {@link requireNonNull}: use it to assert that a slot is still
 * unset before writing to it. `undefined` does not qualify — see
 * {@link requireNil} for the check that accepts both.
 *
 * @example
 * ```javascript
 * requireNull(null);        // => null
 * requireNull(undefined);   // Throws IllegalArgumentException
 * requireNull(0);           // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as `null`.
 * @param   {string} [message="Expected null."] - Optional custom error message if the validation fails.
 * @returns {null} The validated `null` value.
 * @throws  {@link IllegalArgumentException} If the value is not `null`.
 * @see     {@link isNull}
 * @see     {@link nonNull}
 * @see     {@link requireNonNull}
 * @see     [requireNull on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNull.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireNull(value: unknown, message: string = "Expected null."): null {
  if (!isNull(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
