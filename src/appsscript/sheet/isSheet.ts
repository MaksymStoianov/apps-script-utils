import { isObject } from "../../lang";

/**
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSheet();
 *
 * isSheet(sheet); // => true
 * isSheet({}); // => false
 * isSheet(null); // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object, `false` otherwise.
 * @see         {@link nonSheet}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @see         [isSheet on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isSheet.html)
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isSheet(value: unknown): value is GoogleAppsScript.Spreadsheet.Sheet {
  return isObject(value) && value?.toString() === "Sheet";
}
