import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isConsistent2DArray } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

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
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to insert into, or the range to insert at: the rows appear above the range's first row and the values are written on its columns.
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
 * @see         [prependRows on the documentation site](https://maksymstoianov.github.io/apps-script-utils/prependRows.html)
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function prependRows(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: PrependRowsOptions | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

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

    const frozenRows = sheet.getFrozenRows();

    // A range says where to insert, so the frozen-row option has nothing to
    // decide; without one the rows go to the top of the sheet.
    let rowPosition = within ? within.getRow() : 1;

    if (!within && effectiveOptions.afterFrozenRows !== false) {
      rowPosition = frozenRows + 1;

      if (rowPosition < frozenRows) {
        rowPosition = frozenRows;
      }
    }

    const columnPosition = within ? within.getColumn() : 1;

    if (rowPosition <= lastRow) {
      sheet.insertRowsBefore(rowPosition, numRows);

      // Inserting at or above the boundary pushes it along with the data;
      // put it back when the caller asked to prepend before it.
      if (
        effectiveOptions.afterFrozenRows === false &&
        frozenRows > 0 &&
        rowPosition <= frozenRows
      ) {
        sheet.setFrozenRows(frozenRows);
      }
    }

    sheet.getRange(rowPosition, columnPosition, numRows, numColumns).setValues(values);
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : String(err);
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
