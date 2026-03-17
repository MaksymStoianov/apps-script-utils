import { requireNonEmptyString } from "../../lang";
import { join } from "./join";

/**
 * Normalizes a URL path, bringing it to a standard, absolute form.
 *
 * @param       {string} path - The original URL path string to normalize.
 * @returns     {string} A new string representing the normalized, absolute, and URL-encoded path.
 * @throws      {@link EmptyStringException}
 * @environment `Google Apps Script`, `Browser`
 */
export function normalize(path: string): string {
  const result = requireNonEmptyString(path);

  return join("/", result.trim());
}
