import { isAbsolute } from "./isAbsolute";

/**
 * Checks if a given string represents a relative path.
 *
 * @example
 * ```javascript
 * isRelative("docs/readme.md"); // => true
 * isRelative("./a"); // => true
 * isRelative(""); // => true
 * isRelative("/var/log"); // => false
 * isRelative("https://example.com/a"); // => false
 * ```
 *
 * @param       {string} path - The string path to check.
 * @returns     {boolean} `true` if the path is relative; otherwise, `false`.
 * @throws      {@link EmptyStringException}
 * @see         {@link isAbsolute}
 * @see         [isRelative on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isRelative.html)
 * @environment `Google Apps Script`, `Browser`
 */
export function isRelative(path: string): path is string {
  return !isAbsolute(path);
}
