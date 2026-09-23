import { requireNonEmptyString } from "../lang";

/**
 * Escapes special characters in a string for safe use within XML/HTML content.
 *
 * @example
 * ```javascript
 * escapeXml("<a>&"); // => "&lt;a&gt;&amp;"
 * ```
 *
 * @param   {string} value - The string containing characters to be escaped for XML.
 * @returns {string} The escaped string, safe for use in XML/HTML text content or attribute values.
 * @throws  {@link EmptyStringException}
 * @see     {@link escapeHtml}
 * @see     {@link escapeRegExp}
 * @see     [escapeXml on the documentation site](https://maksymstoianov.github.io/apps-script-utils/escapexml.html)
 * @since   1.0.0
 * @version 1.1.0
 */
export function escapeXml(value: string): string {
  return requireNonEmptyString(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
