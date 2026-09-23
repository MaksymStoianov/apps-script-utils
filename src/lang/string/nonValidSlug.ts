import { isValidSlug } from "./isValidSlug";

/**
 * Checks if the provided string is NOT a valid slug.
 *
 * @example
 * ```javascript
 * nonValidSlug("1-page"); // => true
 * nonValidSlug("my page"); // => true
 * nonValidSlug(""); // => true
 * nonValidSlug("my-page"); // => false
 * nonValidSlug("a_1"); // => false
 * ```
 *
 * @param   {string} value - The string value to check.
 * @returns {boolean} `true` if the value is not a valid slug; otherwise, `false`.
 * @see     {@link isValidSlug}
 * @see     [nonValidSlug on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonvalidslug.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidSlug(value: string): boolean {
  return !isValidSlug(value);
}
