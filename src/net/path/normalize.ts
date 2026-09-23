import { requireNonEmptyString } from "../../lang";
import { join } from "./join";

/**
 * Normalizes a URL path, bringing it to a standard, absolute form.
 *
 * @example
 * ```javascript
 * normalize("a/./b/../c"); // => "/a/c"
 * normalize("/a/b/../c/"); // => "/a/c"
 * ```
 *
 * @param       {string} path - The original URL path string to normalize.
 * @returns     {string} A new string representing the normalized, absolute, and URL-encoded path.
 * @throws      {@link EmptyStringException}
 * @see [normalize on the documentation site](https://maksymstoianov.github.io/apps-script-utils/normalize.html)
 * @environment `Google Apps Script`, `Browser`
 */
export function normalize(path: string): string {
  const result = requireNonEmptyString(path);

  return join("/", result.trim());
}
