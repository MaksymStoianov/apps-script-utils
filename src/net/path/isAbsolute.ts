import { isEmpty, isString } from "../../lang";

/**
 * Checks if the given path is absolute.
 *
 * A path is absolute when it carries a scheme (`https://example.com`,
 * `mailto:someone`) or starts with a slash. Everything else — including an
 * empty string — is relative, so {@link isRelative} is the exact complement
 * of this function.
 *
 * @example
 * ```javascript
 * isAbsolute("/var/log");            // => true
 * isAbsolute("https://example.com"); // => true
 * isAbsolute("docs/readme.md");      // => false
 * isAbsolute("");                    // => false
 * ```
 *
 * @param   {string} path - The path to check.
 * @returns {boolean} `true` if the path is absolute; otherwise, `false`.
 * @see     {@link isRelative}
 * @see     {@link requireAbsolute}
 * @see     [isAbsolute on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isabsolute.html)
 * @since   1.0.0
 * @version 1.1.0
 */
export function isAbsolute(path: string): path is string {
  if (!isString(path) || isEmpty(path)) {
    return false;
  }

  if (/^(\w+):\/\//.test(path) || /^(\w+):/.test(path)) {
    return true;
  }

  return path.startsWith("/");
}
