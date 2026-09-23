import { prependRows, type PrependRowsOptions } from "./prependRows";

/**
 * Prepends a single row to the top of the current data area on a [`sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
 * If a cell's content starts with `=`, it is interpreted as a formula.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSheet();
 *
 * prependRow(sheet, ["id", "name", "email"]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to insert into, or the range to insert at: the row appears above the range's first row and the values are written on its columns.
 * @param       {any[]} values - A 1D array containing the data for the single row.
 * @param       {PrependRowsOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendRow}
 * @see         {@link prependRows}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [prependRow on the documentation site](https://maksymstoianov.github.io/apps-script-utils/prependRow.html)
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function prependRow(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: PrependRowsOptions | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  return prependRows(target, [values], options);
}
