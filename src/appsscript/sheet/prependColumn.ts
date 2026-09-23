import { IllegalArgumentException } from "../../exception";
import { isArray, isNil } from "../../lang";
import { type Options } from "./appendColumns";
import { prependColumns } from "./prependColumns";

/**
 * Inserts a single column at the start of a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>,
 * shifting the existing data to the right, and optionally fills it.
 *
 * `values` is the column read downwards — one entry per row — so
 * `["Name", "Ada"]` puts `Name` in row 1 and `Ada` in row 2. Omit it to insert
 * an empty column. A cell whose content starts with `=` is written as a
 * formula.
 *
 * This is what `insertColumnBefore(1)` followed by a `setValues` whose range
 * arithmetic is easy to get wrong replaces.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * prependColumn(sheet, ["Name", "Ada", "Grace"]);
 *
 * prependColumn(sheet); // one empty column at the start
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to insert into, or the range to insert at: the column appears before the range's first column and the values are written on its rows.
 * @param       {unknown[]} [values] - A 1D array holding the column, one entry per row.
 * @param       {Options | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The sheet.
 * @throws      {@link IllegalArgumentException} If `values` is given and is not a non-empty 1D array.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         {@link prependColumns}
 * @see         {@link prependRow}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [prependColumn on the documentation site](https://maksymstoianov.github.io/apps-script-utils/prependcolumn.html)
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function prependColumn(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values?: unknown[] | null,
  options: Options | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  if (isNil(values)) {
    return prependColumns(target, 1, null, options);
  }

  if (!isArray(values) || values.length === 0) {
    throw new IllegalArgumentException(
      "Invalid values provided. Expected a non-empty 1D array (e.g., [1, 2, 3])."
    );
  }

  return prependColumns(
    target,
    1,
    values.map((value: unknown): unknown[] => [value]),
    options
  );
}
