import { IllegalArgumentException } from "../../exception";
import { isNil } from "./isNil";

/**
 * Ensures that the provided value is neither `null` nor `undefined`,
 * throwing an exception otherwise.
 *
 * Differs from the existing {@link requireNonNull} only in the exception it
 * throws: that one raises {@link NullPointerException}, this one keeps the
 * {@link IllegalArgumentException} used across the rest of the `require*`
 * family. Prefer {@link requireNonNull} when the nil value points at a broken
 * invariant, and this one when it is simply bad input.
 *
 * @example
 * ```javascript
 * requireNonNil(0);           // => 0
 * requireNonNil("");          // => ""
 * requireNonNil(null);        // Throws IllegalArgumentException
 * requireNonNil(undefined);   // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the nil cases are excluded.
 * @param    {T | null | undefined} value - The value to validate as non-nil.
 * @param    {string} [message="Expected a value that is neither null nor undefined."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is `null` or `undefined`.
 * @see      {@link isNil}
 * @see      {@link nonNil}
 * @see      {@link requireNonNull}
 * @see      [requireNonNil on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonNil.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonNil<T>(
  value: T | null | undefined,
  message: string = "Expected a value that is neither null nor undefined."
): T {
  if (isNil(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
