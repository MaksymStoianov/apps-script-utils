import { appendRows, type AppendRowsOptions } from "./appendRows";

/**
 * Appends a single row after the last row that holds data, on a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> or inside a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>.
 * If a cell's content starts with `=`, it is interpreted as a formula.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSheet();
 *
 * appendRow(sheet, ["Ada", "ada@example.com", "=TODAY()"]);
 *
 * // Or within one block of a busy sheet:
 * appendRow(sheet.getRange("B1:D10"), ["Ada", "ada@example.com", "=TODAY()"]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> to append to, or the <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> to append within.
 * @param       {unknown[]} values - A 1D array containing the data for the single row.
 * @param       {AppendRowsOptions | null | undefined} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link prependRow}
 * @see         {@link appendRows}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @see         [appendRow on the documentation site](https://maksymstoianov.github.io/apps-script-utils/appendRow.html)
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendRow(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: AppendRowsOptions | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  return appendRows(target, [values], options);
}
