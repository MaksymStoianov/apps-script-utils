import { isSpreadsheet } from "./isSpreadsheet";

/**
 * Checks if the provided value is NOT a <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a> object.
 *
 * @template T
 * @param       {T | GoogleAppsScript.Spreadsheet.Spreadsheet} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a> object; otherwise, `false`.
 * @see         {@link isSpreadsheet}
 * @see         {@link requireSpreadsheet}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonSpreadsheet<T>(value: T | GoogleAppsScript.Spreadsheet.Spreadsheet): value is T {
  return !isSpreadsheet(value);
}
