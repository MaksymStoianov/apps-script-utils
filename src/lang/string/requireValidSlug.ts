import { IllegalArgumentException } from "../../exception";
import { isValidSlug } from "./isValidSlug";
import { requireNonEmptyString } from "./requireNonEmptyString";

/**
 * Validates that the provided value is a non-empty string holding a valid slug.
 *
 * Emptiness is checked first, so an empty input reports emptiness rather than
 * a format error — the same two-stage shape as {@link requireValidEmail}.
 *
 * @example
 * ```javascript
 * requireValidSlug("my-post");    // => "my-post"
 * requireValidSlug("2024-post");  // Throws IllegalArgumentException
 * requireValidSlug("");           // Throws EmptyStringException
 * ```
 *
 * @param   {string | null | undefined} value - The value to validate as a slug.
 * @param   {string} [message="Expected a valid slug."] - Optional custom error message if the validation fails.
 * @returns {string} The validated slug.
 * @throws  {@link EmptyStringException} If the value is not a non-empty string.
 * @throws  {@link IllegalArgumentException} If the value is not a valid slug.
 * @see     {@link isValidSlug}
 * @see     {@link nonValidSlug}
 * @see     [requireValidSlug on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireValidSlug.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireValidSlug(
  value: string | null | undefined,
  message: string = "Expected a valid slug."
): string {
  const slug = requireNonEmptyString(value, message);

  if (!isValidSlug(slug)) {
    throw new IllegalArgumentException(message);
  }

  return slug;
}
