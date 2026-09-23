import { isNull } from "./isNull";

/**
 * Checks if the provided value is NOT `null`.
 *
 * @example
 * ```javascript
 * nonNull(undefined); // => true
 * nonNull(0); // => true
 * nonNull(""); // => true
 * nonNull(null); // => false
 * ```
 *
 * @template T
 * @param   {T | null} value - The value to check.
 * @returns {boolean} `true` if the value is not `null`; otherwise, `false`.
 * @see     {@link isNull}
 * @see     {@link requireNonNull}
 * @see     [nonNull on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonnull.html)
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonNull<T>(value: T | null): value is T {
  return !isNull(value);
}
