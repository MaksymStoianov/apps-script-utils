import { isValidSlug } from "./isValidSlug";

/**
 * Checks if the provided string is NOT a valid slug.
 *
 * @param   {string} value - The string value to check.
 * @returns {boolean} `true` if the value is not a valid slug; otherwise, `false`.
 * @see     {@link isValidSlug}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidSlug(value: string): boolean {
  return !isValidSlug(value);
}
