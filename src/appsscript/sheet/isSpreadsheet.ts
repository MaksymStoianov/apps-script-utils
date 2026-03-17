import { isObject } from "../../lang";

/**
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a> object.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a> object, `false` otherwise.
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet"><code>Spreadsheet</code></a>
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isSpreadsheet(value: unknown): value is GoogleAppsScript.Spreadsheet.Spreadsheet {
  return isObject(value) && value?.toString() === "Spreadsheet";
}
