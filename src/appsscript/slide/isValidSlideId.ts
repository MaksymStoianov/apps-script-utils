import { isString } from "../../lang";

/**
 * Validates if the given string is a valid Google Slides slide ID.
 *
 * @example
 * ```javascript
 * isValidSlideId("p1"); // => true
 * isValidSlideId("SLIDES_api123"); // => true
 * isValidSlideId("has space"); // => false
 * isValidSlideId(""); // => false
 * ```
 *
 * @param {unknown} value The value to check.
 * @returns {value is string} `true` if the value is a valid slide ID, `false` otherwise.
 * @see [isValidSlideId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isvalidslideid.html)
 * @since 1.5.0
 */
export function isValidSlideId(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9-_]+$/.test(value);
}
