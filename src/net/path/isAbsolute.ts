import { requireNonEmptyString } from "../../lang";

/**
 * Checks if a given string represents an absolute path or URL.
 *
 * @param       {string} path - The string path or URL to check.
 * @returns     {boolean} `true` if the path is absolute; otherwise, `false`.
 * @throws      {@link EmptyStringException}
 * @see         {@link isRelative}
 * @environment `Google Apps Script`, `Browser`
 */
export function isAbsolute(path: string): path is string {
  const result = requireNonEmptyString(path);

  if (/^(\w+):\/\//.test(result) || /^(\w+):/.test(result)) {
    return true;
  }

  return result.startsWith("/");
}
