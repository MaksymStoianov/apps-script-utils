import { requireNonEmptyString } from "../lang";

/**
 * Encodes characters in a string (from `U+00A0` to `U+9999`) into their corresponding HTML entities.
 *
 * @param   value - The string to encode.
 * @returns The string with HTML-encoded characters.
 * @throws  {@link EmptyStringException}
 * @see     {@link decodeHtml}
 * @since   1.0.0
 * @version 1.1.0
 */
export function encodeHtml(value: string): string {
  return requireNonEmptyString(value).replace(
    /([\u00A0-\u9999<>&])(.|$)/g,
    function (full, char, next) {
      if (char !== "&" || next !== "#") {
        if (/[\u00A0-\u9999<>&]/.test(next)) {
          next = `&#${next.charCodeAt(0)};`;
        }

        return `&#${char.charCodeAt(0)};${next}`;
      }

      return full;
    }
  );
}
