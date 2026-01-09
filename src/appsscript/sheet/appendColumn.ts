import { appendColumns, type Options } from "./appendColumns";

/**
 * ## appendColumn
 *
 * Appends a single column to the right of the current data area on a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>.
 * If a cell's content starts with `=`, it is interpreted as a formula.
 *
 * @param       sheet - The Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object to which the column will be appended.
 * @param       values - A 1D array containing the data for the single column.
 * @param       [options] - Additional parameters to customize the method's behavior.
 * @returns     The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendColumns}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     1.5.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendColumn(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  values: unknown,
  options: Options | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  return appendColumns(sheet, [values], options);
}
