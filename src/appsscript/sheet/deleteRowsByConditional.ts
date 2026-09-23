import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { type RowConditionalOptions, type RowPredicate } from "./clearRowsByConditional";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * A block of consecutive rows.
 */
interface Block {
  start: number;
  count: number;
}

/**
 * Groups ascending positions into blocks of consecutive ones.
 *
 * @param   {number[]} positions - One-based positions, ascending.
 * @returns {Block[]} One entry per run of consecutive positions.
 */
function toBlocks(positions: number[]): Block[] {
  const blocks: Block[] = [];

  let current: Block | null = null;

  for (const position of positions) {
    if (current !== null && position === current.start + current.count) {
      current.count += 1;

      continue;
    }

    current = { start: position, count: 1 };

    blocks.push(current);
  }

  return blocks;
}

/**
 * Selects the rows a predicate matches.
 *
 * @param   {unknown[][]} values - Every row of the data range.
 * @param   {RowPredicate} predicate - Decides whether a row is selected.
 * @param   {number} headerRow - The one-based header row, or `0` for none.
 * @param   {number} firstRow - The one-based sheet row the values start at.
 * @returns {number[]} The one-based positions of the matching rows, ascending.
 */
function selectRows(
  values: unknown[][],
  predicate: RowPredicate,
  headerRow: number,
  firstRow: number
): number[] {
  const headerIndex: number = headerRow === 0 ? 0 : headerRow - firstRow;

  const [headers = []]: unknown[][] =
    headerRow === 0 || headerIndex < 0 ? [[]] : values.slice(headerIndex, headerIndex + 1);

  const selected: number[] = [];

  for (const [index, row] of values.entries()) {
    const position: number = firstRow + index;

    if (position === headerRow) {
      continue;
    }

    let record: Record<string, unknown> | null = null;

    if (headerRow !== 0) {
      const entries: Array<[string, unknown]> = [];

      for (const [column, cell] of row.entries()) {
        const [header = ""] = headers.slice(column, column + 1);

        entries.push([String(header), cell]);
      }

      record = Object.fromEntries(entries);
    }

    if (predicate(row, position, record)) {
      selected.push(position);
    }
  }

  return selected;
}

/**
 * Removes the rows a predicate selects.
 *
 * **This is the function that exists to contain one specific bug.** Deleting a
 * row shifts every row below it up by one, so a forward loop that deletes as
 * it goes skips rows — and it skips exactly the rows that follow a match,
 * which is why the mistake survives casual testing. Here the matches are
 * collected first, then removed from the bottom of the sheet upwards, with
 * adjacent matches taken out in one call.
 *
 * Formulas and references in the surviving rows are adjusted by the
 * spreadsheet itself, as they are for a manual deletion.
 *
 * Removing every row a sheet has is refused, because a sheet cannot have none
 * and the service reports that with a message that does not say which call
 * caused it. Rows past the data range are not candidates, so a sheet with
 * spare empty rows is unaffected by that rule.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * deleteRowsByConditional(sheet, (values) => values.every((cell) => cell === ""));
 *
 * deleteRowsByConditional(sheet, (values, position, record) => record.Status === "void", {
 *   headerRow: 1
 * });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to delete rows on, or the range to delete within: only its cells are read, and only they are removed, the rest of the sheet staying where it is.
 * @param       {RowPredicate} predicate - Decides whether a row is selected.
 * @param       {RowConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many rows were removed.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, `headerRow` is not a positive integer, or every row would be removed.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         {@link clearRowsByConditional}
 * @see         {@link deleteColumnsByConditional}
 * @see         [deleteRowsByConditional on the documentation site](https://maksymstoianov.github.io/apps-script-utils/deleterowsbyconditional.html)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function deleteRowsByConditional(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  predicate: RowPredicate,
  options: RowConditionalOptions | null | undefined = {}
): number {
  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

  if (!isFunction(predicate)) {
    throw new IllegalArgumentException("Expected 'predicate' to be a function.");
  }

  const headerRow: number = isNil(options?.headerRow) ? 0 : options.headerRow;

  if (headerRow !== 0) {
    requireCountable(headerRow, "Expected 'headerRow' to be a positive integer.");

    if (headerRow < 1) {
      throw new IllegalArgumentException("Expected 'headerRow' to be a positive integer.");
    }
  }

  const range: GoogleAppsScript.Spreadsheet.Range = within ?? sheet.getDataRange();

  const values: unknown[][] = range.getValues();

  const selected: number[] = selectRows(values, predicate, headerRow, range.getRow());

  if (!within && selected.length > 0 && selected.length === sheet.getMaxRows()) {
    throw new IllegalArgumentException(
      "Refusing to delete every row: a sheet must keep at least one."
    );
  }

  const firstColumn: number = range.getColumn();

  const width: number = range.getNumColumns();

  const blocks: Block[] = toBlocks(selected);

  // Bottom upwards: removing a later block cannot move an earlier one.
  for (const block of blocks.reverse()) {
    if (within) {
      // Only the cells inside the range move up; the columns beside it stay put.
      sheet
        .getRange(block.start, firstColumn, block.count, width)
        .deleteCells(SpreadsheetApp.Dimension.ROWS);

      continue;
    }

    sheet.deleteRows(block.start, block.count);
  }

  return selected.length;
}
