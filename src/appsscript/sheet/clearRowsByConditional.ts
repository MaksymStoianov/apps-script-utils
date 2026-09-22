import { IllegalArgumentException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { requireSheet } from "./requireSheet";

/**
 * Decides whether a row is selected.
 *
 * @param   {unknown[]} values - The row's cells, left to right.
 * @param   {number} position - The row's one-based position on the sheet.
 * @param   {Record<string, unknown> | null} record - The row keyed by the header row, or `null` when no header is configured.
 * @returns {boolean} `true` to select the row.
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
 * @param   {unknown[][]} values - Every row of the data range.
 * @param   {RowPredicate} predicate - Decides whether a row is selected.
 * @param   {number} headerRow - The one-based header row, or `0` for none.
 * @returns {number[]} The one-based positions of the matching rows, ascending.
 */
function selectRows(values: unknown[][], predicate: RowPredicate, headerRow: number): number[] {
  // slice rather than an index expression: the position is data, and no other
  // file in this library relies on Array.prototype.at.
  const [headers = []]: unknown[][] =
    headerRow === 0 ? [[]] : values.slice(headerRow - 1, headerRow);

  const selected: number[] = [];

  for (const [index, row] of values.entries()) {
    const position: number = index + 1;

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
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to clear rows on.
 * @param       {RowPredicate} predicate - Decides whether a row is selected.
 * @param       {RowConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many rows were cleared.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, or `headerRow` is not a positive integer.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link clearColumnsByConditional}
 * @see         {@link deleteRowsByConditional}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function clearRowsByConditional(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  predicate: RowPredicate,
  options: RowConditionalOptions | null | undefined = {}
): number {
  requireSheet(sheet);

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

  const range: GoogleAppsScript.Spreadsheet.Range = sheet.getDataRange();

  const values: unknown[][] = range.getValues();

  const width: number = range.getNumColumns();

  const selected: number[] = selectRows(values, predicate, headerRow);

  for (const block of toBlocks(selected)) {
    sheet.getRange(block.start, 1, block.count, width).clearContent();
  }

  return selected.length;
}
