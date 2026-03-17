import { requireNonEmptyString } from "../lang";

/**
 * Decodes common HTML entities in a string.
 *
 * @param   {string} value - The string containing HTML entities to decode.
 * @returns {string} The string with decoded HTML entities.
 * @throws  {@link EmptyStringException}
 * @see     {@link encodeHtml}
 * @since   1.0.0
 * @version 1.3.0
 */
export function decodeHtml(value: string): string {
  return requireNonEmptyString(value)
    .replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
}
