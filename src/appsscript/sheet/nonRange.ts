import { isRange } from "./isRange";

/**
 * ## nonRange
 *
 * Checks if the provided value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 * @see         {@link isRange}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @since       1.3.0
 * @version     1.0.0
 * @environment Google Apps Script
 */
export function nonRange<T>(
  value: T | GoogleAppsScript.Spreadsheet.Range
): value is T {
  return !isRange(value);
}
