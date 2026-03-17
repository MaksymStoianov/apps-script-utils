import { isString } from "../../lang";

/**
 * Checks if the given value is a valid [`Google Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet) ID.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a string with a length greater than 10, `false` otherwise.
 * @see         {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet}
 * @see         [Class Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet)
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidSpreadsheetId(value: unknown): value is string {
  return isString(value) && value.length > 10;
}
