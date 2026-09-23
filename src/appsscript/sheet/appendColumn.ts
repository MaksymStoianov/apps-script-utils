import { isArray } from "../../lang";
import { appendColumns, type Options } from "./appendColumns";

/**
 * Appends a single column after the last column that holds data, on a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> or inside a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>.
 * The values fill the column downwards: one value per row.
 * If a cell's content starts with `=`, it is interpreted as a formula.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSheet();
 *
 * appendColumn(sheet, ["status", "new", "new"]);
 *
 * // Or within one block of a busy sheet:
 * appendColumn(sheet.getRange("A1:D3"), ["status", "new", "new"]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> to append to, or the <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> to append within.
 * @param       {unknown[]} values - A 1D array containing the data for the single column, one value per row.
 * @param       {Options | null | undefined} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendColumns}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @see         [appendColumn on the documentation site](https://maksymstoianov.github.io/apps-script-utils/appendcolumn.html)
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendColumn(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: Options | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  if (!isArray(values)) {
    throw new TypeError(`Invalid values provided. Expected a 1D array (e.g., ["a", "b"]).`);
  }

  // One value per row: the column runs downwards, not across.
  return appendColumns(
    target,
    values.map((value) => [value]),
    options
  );
}
