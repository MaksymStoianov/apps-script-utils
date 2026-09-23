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

export interface AppendRowsOptions {
  /**
   * Determines whether to insert rows after frozen rows.
   * If `true`, rows will be added immediately after the frozen rows, if they exist.
   */
  afterFrozenRows?: boolean;
}

/**
 * Appends rows after the last row that holds data, without overwriting anything.
 * Given a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> the whole sheet is examined and the data is written from column 1; given a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> only the cells inside it are, and the data is written on its columns.
 * The sheet gains rows when it is too short to hold the result.
 * If a cell's content in `values` starts with `=`, it is interpreted as a formula.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet Name');
 *
 * appendRows(sheet, [
 *  ["Value A1", "Value B1", "Value C1"],
 *  ["Value A2", "Value B2", "Value C2"]
 * ]);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> to append to, or the <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> to append within.
 * @param       {any[][]} values - A 2D array containing the data to append.
 * @param       {AppendRowsOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws      {@link IllegalArgumentException}
 * @throws      {@link InvalidSheetException}
 * @see         {@link prependRows}
 * @see         {@link appendRow}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @see         [appendRows on the documentation site](https://maksymstoianov.github.io/apps-script-utils/appendRows.html)
 * @since       1.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function appendRows(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  values: unknown,
  options: AppendRowsOptions | null | undefined = {}
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

  const effectiveOptions: Required<AppendRowsOptions> = {
    afterFrozenRows: false,
    ...options
  };

  const lock = LockService.getDocumentLock();

  try {
    lock?.waitLock(30000);

    const numRows: number = values.length;

    const numColumns: number = values[0].length;

    // A range appends on its own columns; a sheet appends from the first column.
    const columnStart: number = within ? within.getColumn() : 1;

    // The row the data ends at: the write starts one row below it.
    let rowPosition: number;

    if (within) {
      const cells = within.getValues();

      let filled = 0;

      for (let row = cells.length; row > filled; row--) {
        if (cells[row - 1].some((value) => !isBlank(value))) {
          filled = row;

          break;
        }
      }

      rowPosition = within.getRow() + filled - 1;
    } else {
      rowPosition = sheet.getLastRow();
    }

    if (effectiveOptions.afterFrozenRows !== false) {
      const frozenRows = sheet.getFrozenRows();

      if (rowPosition < frozenRows) {
        rowPosition = frozenRows;
      }
    }

    const rowStart = rowPosition + 1;

    // The sheet grows rather than the write failing at its edge.
    const maxRows = sheet.getMaxRows();

    const neededRows = rowStart + numRows - 1 - maxRows;

    if (neededRows > 0) {
      sheet.insertRowsAfter(maxRows, neededRows);
    }

    const maxColumns = sheet.getMaxColumns();

    const neededColumns = columnStart + numColumns - 1 - maxColumns;

    if (neededColumns > 0) {
      sheet.insertColumnsAfter(maxColumns, neededColumns);
    }

    sheet.getRange(rowStart, columnStart, numRows, numColumns).setValues(values);
  } catch (err: unknown) {
    throw err instanceof Error ? err.message : String(err);
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
