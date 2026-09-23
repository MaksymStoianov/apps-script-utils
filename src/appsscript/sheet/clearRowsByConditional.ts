import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * Decides whether a row is selected.
 *
 * @example
 * ```javascript
 * const predicate = (values, position, record) => record?.status === "done";
 * ```
 *
 * @param   {unknown[]} values - The row's cells, left to right.
 * @param   {number} position - The row's one-based position on the sheet.
 * @param   {Record<string, unknown> | null} record - The row keyed by the header row, or `null` when no header is configured.
 * @returns {boolean} `true` to select the row.
 * @see [RowPredicate on the documentation site](https://maksymstoianov.github.io/apps-script-utils/rowpredicate.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export type RowPredicate = (
  values: unknown[],
  position: number,
  record: Record<string, unknown> | null
) => boolean;

/**
 * How the rows are read and which of them are candidates.
 *
 * @example
 * ```javascript
 * const options = { headerRow: 1 };
 * ```
 *
 * @see [RowConditionalOptions on the documentation site](https://maksymstoianov.github.io/apps-script-utils/rowconditionaloptions.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export interface RowConditionalOptions {
  /**
   * The one-based row holding the column names.
   *
   * Setting it does two things: the predicate receives each row keyed by those
   * names, and the header row itself stops being a candidate — deleting or
   * clearing the headers is never what a predicate over the data meant.
   */
  headerRow?: number;
}

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
 * @param   {unknown[][]} values - Every row of the range being examined.
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
  // slice rather than an index expression: the position is data, and no other
  // file in this library relies on Array.prototype.at.
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
 * Clears the contents of the rows a predicate selects, leaving the rows
 * themselves in place.
 *
 * The sheet is read once and the predicate runs against that data, so the cost
 * does not grow with the number of matches. Adjacent matching rows are cleared
 * as one range rather than one call each, which is what keeps a long selection
 * inside the execution time limit.
 *
 * Only the cells are cleared: formats, validation and notes stay. Use
 * {@link deleteRowsByConditional} to remove the rows.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * clearRowsByConditional(sheet, (values) => values.every((cell) => cell === ""));
 *
 * clearRowsByConditional(sheet, (values, position, record) => record.Status === "void", {
 *   headerRow: 1
 * });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to clear rows on, or the range to clear within: only its cells are read, and only they are cleared.
 * @param       {RowPredicate} predicate - Decides whether a row is selected.
 * @param       {RowConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many rows were cleared.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, or `headerRow` is not a positive integer.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         {@link clearColumnsByConditional}
 * @see         {@link deleteRowsByConditional}
 * @see         [clearRowsByConditional on the documentation site](https://maksymstoianov.github.io/apps-script-utils/clearrowsbyconditional.html)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function clearRowsByConditional(
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

  const width: number = range.getNumColumns();

  const firstColumn: number = range.getColumn();

  const selected: number[] = selectRows(values, predicate, headerRow, range.getRow());

  for (const block of toBlocks(selected)) {
    sheet.getRange(block.start, firstColumn, block.count, width).clearContent();
  }

  return selected.length;
}
