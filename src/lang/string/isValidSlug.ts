import { isEmpty, isString } from "../base";

/**
 * Checks if the provided string is a valid slug.
 *
 * @example
 * ```javascript
 * isValidSlug("my-page"); // => true
 * isValidSlug("a_1"); // => true
 * isValidSlug("1-page"); // => false
 * isValidSlug("my page"); // => false
 * isValidSlug(""); // => false
 * ```
 *
 * @param   {string} value - The string value to validate.
 * @returns {boolean} `true` if the value is a valid slug; otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isValidSlug(value: string): boolean {
  return isString(value) && !isEmpty(value) && /^[a-z][0-9a-z_-]*$/i.test(value);
}
