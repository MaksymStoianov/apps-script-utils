import { requireNonEmptyString } from "../lang";

/**
 * Escapes HTML special characters in a string.
 *
 * @example
 * ```javascript
 * escapeHtml("<a>&"); // => "&lt;a&gt;&amp;"
 * ```
 *
 * @param   {string} value - The string to escape.
 * @returns {string} The string with HTML special characters converted to entities.
 * @throws  {@link EmptyStringException}
 * @see     {@link escapeRegExp}
 * @see     {@link escapeXml}
 * @see     [escapeHtml on the documentation site](https://maksymstoianov.github.io/apps-script-utils/escapehtml.html)
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
