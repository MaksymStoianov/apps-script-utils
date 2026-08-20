import { isString } from "../../lang";

const SCHEME_PATTERN: RegExp = /^(https?|ftp):\/\//i;

/**
 * Checks if the given value is a valid URL string.
 *
 * @example
 * ```javascript
 * isUrl("https://www.example.com");        // true
 * isUrl("https://example.com/path");       // true
 * isUrl("http://localhost:3000/path");     // true
 * isUrl("ftp://ftp.example.org/file.txt"); // true
 * isUrl("invalid-url");                    // false
 * isUrl("  https://whitespace.com ");      // false
 * isUrl("");                               // false
 * isUrl("   ");                            // false
 * isUrl(null);                             // false
 * isUrl(undefined);                        // false
 * isUrl(123);                              // false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a valid URL string; otherwise, `false`.
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isUrl(value: unknown): value is string {
  if (!isString(value) || /\s/.test(value)) {
    return false;
  }

  const match: RegExpMatchArray | null = value.match(SCHEME_PATTERN);

  if (!match) {
    return false;
  }

  const rest: string = value.slice(match[0].length);

  if (rest.length === 0) {
    return false;
  }

  const delimiterIndex: number = rest.search(/[/?#]/);

  const authority: string = delimiterIndex === -1 ? rest : rest.slice(0, delimiterIndex);

  if (authority.length === 0) {
    return false;
  }

  let host: string = authority;

  const atIndex: number = host.lastIndexOf("@");

  if (atIndex !== -1) {
    host = host.slice(atIndex + 1);

    if (host.length === 0) {
      return false;
    }
  }

  if (host.startsWith("[")) {
    const closingBracket: number = host.indexOf("]");

    if (closingBracket === -1) {
      return false;
    }

    const portPart: string = host.slice(closingBracket + 1);

    if (portPart.length > 0 && !/^:\d{1,5}$/.test(portPart)) {
      return false;
    }

    host = host.slice(1, closingBracket);

    return host.length > 0 && !/[/?#\s]/.test(host);
  }

  const colonIndex: number = host.lastIndexOf(":");

  if (colonIndex !== -1) {
    const portPart: string = host.slice(colonIndex + 1);

    if (!/^\d{1,5}$/.test(portPart)) {
      return false;
    }

    host = host.slice(0, colonIndex);

    if (host.length === 0) {
      return false;
    }
  }

  return host.length > 0 && !/[/?#:\s]/.test(host);
}
