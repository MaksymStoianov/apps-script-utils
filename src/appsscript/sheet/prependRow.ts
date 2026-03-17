import { prependRows, type PrependRowsOptions } from "./prependRows";

/**
 * Prepends a single row to the top of the current data area on a [`sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
 * If a cell's content starts with `=`, it is interpreted as a formula.
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Google Apps Script {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object to which the row will be prepended.
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
 * @since       1.0.0
 * @version     1.5.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function prependRow(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  values: unknown,
  options: PrependRowsOptions | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  return prependRows(sheet, [values], options);
}
