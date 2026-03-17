import { isSheet } from "./isSheet";

/**
 * Checks if the provided value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @see         {@link isSheet}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.3.0
 * @version     1.0.0
 * @environment Google Apps Script
 */
export function nonSheet<T>(value: T | GoogleAppsScript.Spreadsheet.Sheet): value is T {
  return !isSheet(value);
}
