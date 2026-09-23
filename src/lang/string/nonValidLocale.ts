import { isValidLocale } from "./isValidLocale";

/**
 * Checks if the provided string is NOT a valid locale.
 *
 * Inherits the definition used by {@link isValidLocale}, which currently
 * accepts a bare two-letter language code only: `en-US` and other tags
 * carrying a region or script subtag are reported as invalid here.
 *
 * @example
 * ```javascript
 * nonValidLocale("en-US"); // => true
 * nonValidLocale("eng"); // => true
 * nonValidLocale(""); // => true
 * nonValidLocale("en"); // => false
 * nonValidLocale("UK"); // => false
 * ```
 *
 * @param   {string} value - The string value to check.
 * @returns {boolean} `true` if the value is not a valid locale; otherwise, `false`.
 * @see     {@link isValidLocale}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidLocale(value: string): boolean {
  return !isValidLocale(value);
}
