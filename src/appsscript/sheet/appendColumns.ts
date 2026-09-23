import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isConsistent2DArray, isNil } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * A cell counts as data unless it is empty: `0` and `false` are values a caller put there.
 */
function isBlank(value: unknown): boolean {
  return value === "" || isNil(value);
}

export interface Options {
  /**
   * Determines whether to insert columns after frozen columns.
   * If `true`, columns will be added immediately to the right of any frozen columns, if they exist.
   */
  afterFrozenColumns?: boolean;
}

/**
 * Appends columns after the last column that holds data, without overwriting anything.
 * Given a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> the whole sheet is examined; given a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> only the cells inside it are, and the values are written on its rows.
 * The sheet gains columns when it is too narrow to hold the result.
 * If a cell's content starts with `=`, it will be interpreted as a formula.
 *
 * @example (Appending to a sheet)
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
 * @example (Appending within a range)
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet Name');
 *
 * // Data further down the sheet does not move the write.
 * appendColumns(sheet.getRange("A1:D2"), [["a"], ["b"]]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> to append to, or the <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> to append within.
 * @param       {any[][]} values - A 2D array containing the data to append.
 * @param       {Options | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link appendColumn}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendColumns(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: Options | null | undefined = {}
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

  const effectiveOptions: Required<Options> = {
    afterFrozenColumns: false,
    ...options
  };

  const lock = LockService.getDocumentLock();

  try {
    lock?.waitLock(30000);

    const numRows: number = values.length;

    const numColumns: number = values[0].length;

    // A range appends on its own rows; a sheet appends from the first row.
    const rowPosition: number = within ? within.getRow() : 1;

    // The column the data ends at: the write starts one column further right.
    let columnPosition: number;

    if (within) {
      const cells = within.getValues();

      let filled = 0;

      for (const row of cells) {
        for (let column = row.length; column > filled; column--) {
          if (!isBlank(row[column - 1])) {
            filled = column;

            break;
          }
        }
      }

      columnPosition = within.getColumn() + filled - 1;
    } else {
      columnPosition = sheet.getLastColumn();
    }

    if (effectiveOptions.afterFrozenColumns !== false) {
      const frozenColumns = sheet.getFrozenColumns();

      if (columnPosition < frozenColumns) {
        columnPosition = frozenColumns;
      }
    }

    const columnStart = columnPosition + 1;

    // The sheet grows rather than the write failing at its edge.
    const maxColumns = sheet.getMaxColumns();

    const neededColumns = columnStart + numColumns - 1 - maxColumns;

    if (neededColumns > 0) {
      sheet.insertColumnsAfter(maxColumns, neededColumns);
    }

    const maxRows = sheet.getMaxRows();

    const neededRows = rowPosition + numRows - 1 - maxRows;

    if (neededRows > 0) {
      sheet.insertRowsAfter(maxRows, neededRows);
    }

    sheet.getRange(rowPosition, columnStart, numRows, numColumns).setValues(values);
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : String(err);
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
