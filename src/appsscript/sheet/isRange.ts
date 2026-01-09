import { isObject } from "../../lang";

/**
 * ## isRange
 *
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 *
 * @param       value - The value to check.
 * @returns     `true` if the value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object, `false` otherwise.
 * @see         {@link nonRange}
 * @see         {@link requireRange}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isRange(
  value: unknown
): value is GoogleAppsScript.Spreadsheet.Range {
  return isObject(value) && value?.toString() === "Range";
}
