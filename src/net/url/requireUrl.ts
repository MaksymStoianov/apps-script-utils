import { IllegalArgumentException } from "../../exception";
import { isUrl } from "./isUrl";

/**
 * Ensures that the provided value is a valid URL string, throwing an exception
 * otherwise.
 *
 * This is the guard to put in front of
 * <a href="https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl"><code>UrlFetchApp.fetch</code></a>,
 * which fails late and with a message that does not name the offending value.
 *
 * Mirrors {@link isUrl}: the `http`, `https` and `ftp` schemes are accepted, a
 * non-empty authority is required, and nothing is trimmed — a URL padded with
 * whitespace is rejected.
 *
 * @example
 * ```javascript
 * requireUrl("https://example.com/path");      // => "https://example.com/path"
 * requireUrl("invalid-url");                   // Throws IllegalArgumentException
 * requireUrl("  https://example.com ");        // Throws IllegalArgumentException
 * requireUrl(null, "Endpoint is not set.");    // Throws with that message
 * ```
 *
 * @param       {unknown} value - The value to validate as a URL string.
 * @param       {string} [message="Expected a valid URL."] - Optional custom error message if the validation fails.
 * @returns     {string} The validated URL string.
 * @throws      {@link IllegalArgumentException} If the value is not a valid URL string.
 * @see         {@link isUrl}
 * @see         {@link nonUrl}
 * @see         [requireUrl on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireurl.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireUrl(value: unknown, message: string = "Expected a valid URL."): string {
  if (!isUrl(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
