import { isNonNegative } from "./isNonNegative";

/**
 * Checks if a value is a number greater than or equal to zero.
 *
 * The name breaks the library's convention: everywhere else a `nonX` prefix
 * means "is NOT X" and returns the negation of `isX`. Here it means "is a
 * non-negative number", and there is no `isNegative` being negated — so a
 * reader who knows `nonString` or `nonArray` will read this one backwards.
 *
 * @example
 * ```javascript
 * nonNegative(0); // => true
 * nonNegative(-1); // => false
 * ```
 *
 * @deprecated Use {@link isNonNegative} instead, which says the same thing
 * under the naming convention used across the library. This alias is kept for
 * backwards compatibility and will be removed in a future major release.
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a number and is not negative; otherwise, `false`.
 * @see     {@link isNonNegative}
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonNegative(value: unknown): value is number {
  return isNonNegative(value);
}
