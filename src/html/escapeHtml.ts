import { requireNonEmptyString } from "../lang";

/**
 * ## escapeHtml
 *
 * Escapes HTML special characters in a string.
 *
 * @param   value - The string to escape.
 * @returns The string with HTML special characters converted to entities.
 * @throws  {@link EmptyStringException}
 * @see     {@link escapeRegExp}
 * @see     {@link escapeXml}
 * @since   1.0.0
 * @version 1.1.0
 */
export function escapeHtml(value: string): string {
  return requireNonEmptyString(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
