import { isEmpty, isString } from "../base";

/**
 * Checks if the provided string is a valid two-letter locale code.
 *
 * @example
 * ```javascript
 * isValidLocale("en"); // => true
 * isValidLocale("UK"); // => true
 * isValidLocale("en-US"); // => false
 * isValidLocale("eng"); // => false
 * isValidLocale(""); // => false
 * ```
 *
 * @param   {string} value - The string value to validate as a locale code.
 * @returns {boolean} `true` if the input is a valid two-letter locale code; otherwise, `false`.
 * @see [isValidLocale on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isValidLocale.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export function isValidLocale(value: string): boolean {
  return isString(value) && !isEmpty(value) && /^[a-z]{2}$/i.test(value);
}
