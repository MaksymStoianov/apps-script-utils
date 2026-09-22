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
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to insert into.
 * @param       {unknown[]} [values] - A 1D array holding the column, one entry per row.
 * @param       {Options | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The sheet.
 * @throws      {@link IllegalArgumentException} If `values` is given and is not a non-empty 1D array.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link prependColumns}
 * @see         {@link prependRow}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function prependColumn(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  values?: unknown[] | null,
  options: Options | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  if (isNil(values)) {
    return prependColumns(sheet, 1, null, options);
  }

  if (!isArray(values) || values.length === 0) {
    throw new IllegalArgumentException(
      "Invalid values provided. Expected a non-empty 1D array (e.g., [1, 2, 3])."
    );
  }

  return prependColumns(
    sheet,
    1,
    values.map((value: unknown): unknown[] => [value]),
    options
  );
}
