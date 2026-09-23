import { isString } from "../../lang";

/**
 * Validates if the given string is a valid Google Slides presentation ID.
 *
 * @example
 * ```javascript
 * isValidPresentationId("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"); // => true
 * isValidPresentationId("short-id"); // => false
 * isValidPresentationId("has space in it and is long enough to pass"); // => false
 * ```
 *
 * @param {unknown} value The value to check.
 * @returns {value is string} `true` if the value is a valid presentation ID, `false` otherwise.
 * @see [isValidPresentationId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isValidPresentationId.html)
 * @since 1.5.0
 */
export function isValidPresentationId(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9-_]{25,}$/.test(value);
}
