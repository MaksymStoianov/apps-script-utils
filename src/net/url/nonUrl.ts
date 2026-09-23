import { isUrl } from "./isUrl";

/**
 * Checks if the given value is NOT a valid URL string.
 *
 * Mirrors {@link isUrl}, which accepts the `http`, `https` and `ftp` schemes
 * and requires a non-empty authority. A string padded with whitespace does not
 * qualify as a URL and therefore qualifies here, because nothing is trimmed.
 *
 * @example
 * ```javascript
 * nonUrl("invalid-url");                    // true
 * nonUrl("  https://whitespace.com ");      // true — nothing is trimmed
 * nonUrl("");                               // true
 * nonUrl(null);                             // true
 * nonUrl(123);                              // true
 * nonUrl("https://www.example.com");        // false
 * nonUrl("ftp://ftp.example.org/file.txt"); // false
 * ```
 *
 * @template    T - The type of the value once the URL string case is excluded.
 * @param       {T | string} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid URL string; otherwise, `false`.
 * @see         {@link isUrl}
 * @see         [nonUrl on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonurl.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonUrl<T>(value: T | string): value is T {
  return !isUrl(value);
}
