import { isLength } from "./isLength";

/**
 * Checks if `value` is NOT a valid array-like length.
 *
 * @example
 * ```javascript
 * nonLength(-1); // => true
 * nonLength(1.5); // => true
 * nonLength("3"); // => true
 * nonLength(0); // => false
 * nonLength(42); // => false
 * nonLength(Number.MAX_SAFE_INTEGER); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if `value` is not a valid length, else `false`.
 * @see     {@link isLength}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonLength(value: unknown): boolean {
  return !isLength(value);
}
