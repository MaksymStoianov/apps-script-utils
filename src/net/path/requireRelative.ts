import { IllegalArgumentException } from "../../exception";
import { isString } from "../../lang";
import { isRelative } from "./isRelative";

/**
 * Ensures that the given path is a relative path string, throwing an exception otherwise.
 *
 * Note that an empty string is relative and therefore passes. Combine with
 * {@link requireNonEmptyString} when a path is also required to be present.
 *
 * Unlike {@link isRelative}, this function also rejects non-string input.
 * The guard reports `true` for `null` — it is, after all, not an absolute
 * path — but a `require*` function promises to return a `string`, and
 * handing back `null` under that type would be unsound.
 *
 * @example
 * ```javascript
 * requireRelative("docs/readme.md");      // => "docs/readme.md"
 * requireRelative("");                    // => "" (empty is relative)
 * requireRelative("/var/log");            // Throws IllegalArgumentException
 * requireRelative(null);                  // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} path - The value to validate as a relative path.
 * @param   {string} [message="Expected a relative path."] - Optional custom error message if the validation fails.
 * @returns {string} The validated relative path.
 * @throws  {@link IllegalArgumentException} If the value is not a string, or is not relative.
 * @see     {@link isRelative}
 * @see     {@link nonRelative}
 * @see     {@link requireAbsolute}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireRelative(
  path: unknown,
  message: string = "Expected a relative path."
): string {
  if (!isString(path) || !isRelative(path)) {
    throw new IllegalArgumentException(message);
  }

  return path;
}
