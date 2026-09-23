import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isConsistent2DArray, isNil, requireCountable } from "../../lang";
import { type Options } from "./appendColumns";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * Inserts columns at the start of a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>,
 * shifting the existing data to the right, and optionally fills them.
 *
 * This is a separate function rather than a loop over {@link prependColumn}
 * for one reason: every `insertColumnsBefore` call is its own Apps Script
 * round trip, and twenty of them on a large sheet will reach the execution
 * time limit. One insert and one write do the job whatever the width.
 *
 * `values` is a matrix indexed by row and then by column, so its width must
 * equal `count`. Omit it to insert empty columns. A `count` of `0` is a
 * no-op rather than an error, so a computed count needs no guard at the call
 * site. A cell whose content starts with `=` is written as a formula.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * prependColumns(sheet, 2, [
 *   ["A1", "B1"],
 *   ["A2", "B2"]
 * ]);
 *
 * prependColumns(sheet, 3); // three empty columns at the start
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to insert into, or the range to insert at: the columns appear before the range's first column and the values are written on its rows.
 * @param       {number} count - How many columns to insert. `0` does nothing.
 * @param       {unknown[][]} [values] - A 2D array, indexed by row then column, whose width must equal `count`.
 * @param       {Options | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The sheet.
 * @throws      {@link IllegalArgumentException} If `count` is not a non-negative safe integer, or `values` does not match it.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         {@link prependColumn}
 * @see         {@link prependRows}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [prependColumns on the documentation site](https://maksymstoianov.github.io/apps-script-utils/prependColumns.html)
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function prependColumns(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  count: number,
  values?: unknown[][] | null,
  options: Options | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Sheet {
  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

  requireCountable(count, "Expected 'count' to be a non-negative safe integer.");

  const hasValues: boolean = !isNil(values);

  if (hasValues && !isConsistent2DArray(values)) {
    throw new IllegalArgumentException(
      "Invalid values provided. Expected a non-empty, consistent 2D array (e.g., [[1, 2], [3, 4]])."
    );
  }

  if (hasValues && (values as unknown[][])[0].length !== count) {
    const width: number = (values as unknown[][])[0].length;

    throw new IllegalArgumentException(
      `Expected 'values' to be ${count} columns wide, but it is ${width}.`
    );
  }

  if (count === 0) {
    return sheet;
  }

  const effectiveOptions: Required<Options> = {
    afterFrozenColumns: false,
    ...options
  };

  const lock = LockService.getDocumentLock();

  try {
    lock?.waitLock(30000);

    const frozenColumns: number = sheet.getFrozenColumns();

    // A range says where to insert, so the frozen-column option has nothing to
    // decide; without one the columns go to the start of the sheet.
    const columnPosition: number = within
      ? within.getColumn()
      : effectiveOptions.afterFrozenColumns
        ? frozenColumns + 1
        : 1;

    if (columnPosition <= sheet.getLastColumn()) {
      sheet.insertColumnsBefore(columnPosition, count);

      // Inserting at or before the boundary pushes it along with the data;
      // put it back when the caller asked to prepend before it.
      if (
        !effectiveOptions.afterFrozenColumns &&
        frozenColumns > 0 &&
        columnPosition <= frozenColumns
      ) {
        sheet.setFrozenColumns(frozenColumns);
      }
    }

    if (hasValues) {
      const matrix: unknown[][] = values as unknown[][];

      const rowPosition: number = within ? within.getRow() : 1;

      sheet.getRange(rowPosition, columnPosition, matrix.length, count).setValues(matrix);
    }
  } finally {
    lock?.releaseLock();
  }

  return sheet;
}
