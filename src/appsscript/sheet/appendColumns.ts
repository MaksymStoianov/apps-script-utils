import { IllegalArgumentException } from "../../exception";
import { isConsistent2DArray } from "../../lang";
import { requireSheet } from "./requireSheet";

export interface Options {
  /**
   * Determines whether to insert columns after frozen columns.
   * If `true`, columns will be added immediately to the right of any frozen columns, if they exist.
   */
  afterFrozenColumns?: boolean;
}

/**
 * Appends columns to the right of the current data area on a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>.
 * If a cell's content starts with `=`, it will be interpreted as a formula.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet Name');
 *
 * appendColumns(sheet, [
 *  ["1-1", "1-2", "1-3"],
 *  ["2-1", "2-2", "2-3"],
 *  ["3-1", "3-2", "3-3"]
 * ]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object to which columns will be appended.
 * @param       {any[][]} values - A 2D array containing the data to append.
 * @param       {Options | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendColumn}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     1.4.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendColumns(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  values: unknown,
  options: Options | null | undefined = {}
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

  const effectiveOptions: Required<Options> = {
    afterFrozenColumns: false,
    ...options
  };

  const lock = LockService.getDocumentLock();

  try {
    lock?.waitLock(30000);

    const numRows: number = values.length;

    const numColumns: number = values[0].length;

    const lastCol: number = sheet.getLastColumn();

    let columnPosition: number = lastCol;

    if (effectiveOptions.afterFrozenColumns !== false) {
      const frozenColumns = sheet.getFrozenColumns();

      if (columnPosition < frozenColumns) {
        columnPosition = frozenColumns;
      }
    }

    const range = sheet.getRange(1, columnPosition, numRows, numColumns);

    range.setValues(values);
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : String(err);
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
