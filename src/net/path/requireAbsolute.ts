import { IllegalArgumentException } from "../../exception";
import { isAbsolute } from "./isAbsolute";

/**
 * Ensures that the given path is absolute, throwing an exception otherwise.
 *
 * A path is absolute when it carries a scheme or starts with a slash. Empty
 * and non-string input is rejected as well.
 *
 * @example
 * ```javascript
 * requireAbsolute("/var/log");            // => "/var/log"
 * requireAbsolute("https://example.com"); // => "https://example.com"
 * requireAbsolute("docs/readme.md");      // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} path - The value to validate as an absolute path.
 * @param   {string} [message="Expected an absolute path."] - Optional custom error message if the validation fails.
 * @returns {string} The validated absolute path.
 * @throws  {@link IllegalArgumentException} If the path is not absolute.
 * @see     {@link isAbsolute}
 * @see     {@link nonAbsolute}
 * @see     {@link requireRelative}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireAbsolute(
  path: unknown,
  message: string = "Expected an absolute path."
): string {
  if (!isAbsolute(path as string)) {
    throw new IllegalArgumentException(message);
  }

  return path as string;
}
