import { isString } from "../../lang";

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
 * @param   value - The value to check.
 * @returns `true` if the value is a valid URL string; otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isUrl(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  const PATTERN =
    /^(https?|ftp):\/\/([^\s/?#]+\.[^\s/?#]+)(:\d+)?(\/\S*)?([?#]\S*)?$/i;

  return PATTERN.test(value);
}
