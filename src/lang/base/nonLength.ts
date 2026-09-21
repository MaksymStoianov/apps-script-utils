import { isLength } from "./isLength";

/**
 * Checks if `value` is NOT a valid array-like length.
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
