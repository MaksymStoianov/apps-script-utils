import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * Decides whether a column is selected.
 *
 * @example
 * ```javascript
 * const predicate = (values) => values.every((cell) => cell === "");
 * ```
 *
 * @param   {unknown[]} values - The column's cells, top to bottom.
 * @param   {number} position - The column's one-based position on the sheet.
 * @param   {Record<string, unknown> | null} record - The column keyed by the header column, or `null` when no header is configured.
 * @returns {boolean} `true` to select the column.
 * @since   1.11.0
 * @version 1.0.0
 */
export type ColumnPredicate = (
  values: unknown[],
  position: number,
  record: Record<string, unknown> | null
) => boolean;

/**
 * How the columns are read and which of them are candidates.
 *
 * The mirror of `RowConditionalOptions`: a sheet laid out in columns has its
 * names down the left rather than across the top.
 *
 * @example
 * ```javascript
 * const options = { headerColumn: 1 };
 * ```
 *
 * @since   1.11.0
 * @version 1.0.0
 */
export interface ColumnConditionalOptions {
  /**
   * The one-based column holding the row names.
   *
   * Setting it does two things: the predicate receives each column keyed by
   * those names, and the header column itself stops being a candidate —
   * clearing the headers is never what a predicate over the data meant.
   */
  headerColumn?: number;
}

/**
 * A block of consecutive columns.
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
 * Turns the row-major values a range reports into one array per column.
 *
 * Accumulating into a map keyed by column keeps the walk row-major, which is
 * how the data arrives, and free of index arithmetic over the matrix.
 *
 * @param   {unknown[][]} values - Every row of the data range.
 * @returns {Map<number, unknown[]>} The columns, keyed by their zero-based index.
 */
function toColumns(values: unknown[][]): Map<number, unknown[]> {
  const columns: Map<number, unknown[]> = new Map();

  for (const row of values) {
    for (const [index, cell] of row.entries()) {
      const column: unknown[] = columns.get(index) ?? [];

      column.push(cell);
      columns.set(index, column);
    }
  }

  return columns;
}

/**
 * Selects the columns a predicate matches.
 *
 * @param   {unknown[][]} values - Every row of the data range.
 * @param   {ColumnPredicate} predicate - Decides whether a column is selected.
 * @param   {number} headerColumn - The one-based header column, or `0` for none.
 * @param   {number} firstColumn - The one-based sheet column the values start at.
 * @returns {number[]} The one-based positions of the matching columns, ascending.
 */
function selectColumns(
  values: unknown[][],
  predicate: ColumnPredicate,
  headerColumn: number,
  firstColumn: number
): number[] {
  const columns: Map<number, unknown[]> = toColumns(values);

  const headers: unknown[] =
    headerColumn === 0 ? [] : (columns.get(headerColumn - firstColumn) ?? []);

  const selected: number[] = [];

  for (const [index, column] of columns) {
    const position: number = firstColumn + index;

    if (position === headerColumn) {
      continue;
    }

    let record: Record<string, unknown> | null = null;

    if (headerColumn !== 0) {
      const entries: Array<[string, unknown]> = [];

      for (const [row, cell] of column.entries()) {
        const [header = ""] = headers.slice(row, row + 1);

        entries.push([String(header), cell]);
      }

      record = Object.fromEntries(entries);
    }

    if (predicate(column, position, record)) {
      selected.push(position);
    }
  }

  return selected;
}

/**
 * Clears the contents of the columns a predicate selects, leaving the columns
 * themselves in place.
 *
 * The mirror of {@link clearRowsByConditional}, down to the shape of the
 * predicate: the values, the one-based position, and — when a header column is
 * configured — the column keyed by the names down the left.
 *
 * The sheet is read once and the predicate runs against that data, so the cost
 * does not grow with the number of matches. Adjacent matching columns are
 * cleared as one range rather than one call each, which is what keeps a wide
 * selection inside the execution time limit.
 *
 * Only the cells are cleared: formats, validation and notes stay. Use
 * {@link deleteColumnsByConditional} to remove the columns.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * clearColumnsByConditional(sheet, (values) => values.every((cell) => cell === ""));
 *
 * clearColumnsByConditional(sheet, (values, position, record) => record.Region === "n/a", {
 *   headerColumn: 1
 * });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to clear columns on, or the range to clear within: only its cells are read, and only they are cleared.
 * @param       {ColumnPredicate} predicate - Decides whether a column is selected.
 * @param       {ColumnConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many columns were cleared.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, or `headerColumn` is not a positive integer.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         {@link clearRowsByConditional}
 * @see         {@link deleteColumnsByConditional}
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function clearColumnsByConditional(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  predicate: ColumnPredicate,
  options: ColumnConditionalOptions | null | undefined = {}
): number {
  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

  if (!isFunction(predicate)) {
    throw new IllegalArgumentException("Expected 'predicate' to be a function.");
  }

  const headerColumn: number = isNil(options?.headerColumn) ? 0 : options.headerColumn;

  if (headerColumn !== 0) {
    requireCountable(headerColumn, "Expected 'headerColumn' to be a positive integer.");

    if (headerColumn < 1) {
      throw new IllegalArgumentException("Expected 'headerColumn' to be a positive integer.");
    }
  }

  const range: GoogleAppsScript.Spreadsheet.Range = within ?? sheet.getDataRange();

  const values: unknown[][] = range.getValues();

  const height: number = range.getNumRows();

  const firstRow: number = range.getRow();

  const selected: number[] = selectColumns(values, predicate, headerColumn, range.getColumn());

  for (const block of toBlocks(selected)) {
    sheet.getRange(firstRow, block.start, height, block.count).clearContent();
  }

  return selected.length;
}
