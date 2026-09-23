import { isAbsolute } from "./isAbsolute";

/**
 * Checks if the given path is NOT absolute.
 *
 * Equivalent to {@link isRelative} in result — every path that is not
 * absolute is relative — but named for the guard it negates. Prefer
 * `isRelative` when the intent is to assert relativeness, and this one when
 * the intent is to rule out an absolute path.
 *
 * @example
 * ```javascript
 * nonAbsolute("docs/readme.md");      // => true
 * nonAbsolute("");                    // => true
 * nonAbsolute("/var/log");            // => false
 * nonAbsolute("https://example.com"); // => false
 * ```
 *
 * @param   {string} path - The path to check.
 * @returns {boolean} `true` if the path is not absolute; otherwise, `false`.
 * @see     {@link isAbsolute}
 * @see     {@link isRelative}
 * @see     {@link requireAbsolute}
 * @see     [nonAbsolute on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonAbsolute.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonAbsolute(path: string): boolean {
  return !isAbsolute(path);
}
