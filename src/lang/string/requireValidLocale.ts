import { IllegalArgumentException } from "../../exception";
import { isValidLocale } from "./isValidLocale";
import { requireNonEmptyString } from "./requireNonEmptyString";

/**
 * Validates that the provided value is a non-empty string holding a valid locale.
 *
 * Inherits the definition used by {@link isValidLocale}, which currently
 * accepts a bare two-letter language code only: `en-US` and other tags
 * carrying a region or script subtag are rejected.
 *
 * @example
 * ```javascript
 * requireValidLocale("en");      // => "en"
 * requireValidLocale("en-US");   // Throws IllegalArgumentException
 * requireValidLocale("");        // Throws EmptyStringException
 * ```
 *
 * @param   {string | null | undefined} value - The value to validate as a locale.
 * @param   {string} [message="Expected a valid locale."] - Optional custom error message if the validation fails.
 * @returns {string} The validated locale.
 * @throws  {@link EmptyStringException} If the value is not a non-empty string.
 * @throws  {@link IllegalArgumentException} If the value is not a valid locale.
 * @see     {@link isValidLocale}
 * @see     {@link nonValidLocale}
 * @see     [requireValidLocale on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireValidLocale.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireValidLocale(
  value: string | null | undefined,
  message: string = "Expected a valid locale."
): string {
  const locale = requireNonEmptyString(value, message);

  if (!isValidLocale(locale)) {
    throw new IllegalArgumentException(message);
  }

  return locale;
}
