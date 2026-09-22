import { isRelative } from "./isRelative";

/**
 * Checks if the given path is NOT relative.
 *
 * Equivalent to {@link isAbsolute} in result — every path that is not
 * relative is absolute — but named for the guard it negates.
 *
 * @example
 * ```javascript
 * nonRelative("/var/log");            // => true
 * nonRelative("https://example.com"); // => true
 * nonRelative("docs/readme.md");      // => false
 * nonRelative("");                    // => false
 * ```
 *
 * @param   {string} path - The path to check.
 * @returns {boolean} `true` if the path is not relative; otherwise, `false`.
 * @see     {@link isRelative}
 * @see     {@link isAbsolute}
 * @see     {@link requireRelative}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonRelative(path: string): boolean {
  return !isRelative(path);
}
