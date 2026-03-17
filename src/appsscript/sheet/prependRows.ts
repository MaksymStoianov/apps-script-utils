import { IllegalArgumentException } from "../../exception";
import { isConsistent2DArray } from "../../lang";
import { requireSheet } from "./requireSheet";

export interface PrependRowsOptions {

  /**
   * Determines whether to insert rows after frozen rows.
   * If `true`, rows will be added immediately after the frozen rows, if they exist.
   */
  afterFrozenRows?: boolean;
}

/**
 * Prepends rows to the top of the current data area on a [`sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
 * Data is written starting from column 1 of the new rows.
 * If a cell's content in `values` starts with `=`, it is interpreted as a formula.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet Name');
 *
 * prependRows(sheet, [
 *  ["Value A1", "Value B1", "Value C1"],
 *  ["Value A2", "Value B2", "Value C2"]
 * ]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Google Apps Script {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object to which columns will be prepended.
 * @param       {any[][]} values - A 2D array containing the data to prepend.
 * @param       {PrependRowsOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendRows}
 * @see         {@link prependRow}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.4.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function prependRows(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  values: unknown,
  options: PrependRowsOptions | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  requireSheet(sheet);

  if (!isConsistent2DArray(values)) {
    throw new TypeError(
      `Invalid values provided. Expected a non-empty, consistent 2D array (e.g., [[1, 2], [3, 4]]).`
    );
  }

  const effectiveOptions: Required<PrependRowsOptions> = {
    afterFrozenRows: false,
    ...options
  };

  const lock = LockService.getDocumentLock();

  try {
    lock?.waitLock(30000);

    const numRows: number = values.length;

    const numColumns: number = values[0].length;

    const lastRow = sheet.getLastRow();

    let rowPosition = 1;

    const frozenRows = sheet.getFrozenRows();

    if (effectiveOptions.afterFrozenRows !== false) {
      rowPosition = frozenRows + 1;

      if (rowPosition < frozenRows) {
        rowPosition = frozenRows;
      }
    }

    if (rowPosition <= lastRow) {
      sheet.insertRowsBefore(rowPosition, numRows);

      if (effectiveOptions.afterFrozenRows === false && frozenRows > 0) {
        sheet.setFrozenRows(frozenRows);
      }
    }

    const range = sheet.getRange(rowPosition, 1, numRows, numColumns);

    range.setValues(values);
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : String(err);
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
