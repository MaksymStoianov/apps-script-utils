import { IllegalArgumentException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { type ColumnConditionalOptions, type ColumnPredicate } from "./clearColumnsByConditional";
import { requireSheet } from "./requireSheet";

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
 * @returns {number[]} The one-based positions of the matching columns, ascending.
 */
function selectColumns(
  values: unknown[][],
  predicate: ColumnPredicate,
  headerColumn: number
): number[] {
  const columns: Map<number, unknown[]> = toColumns(values);

  const headers: unknown[] = headerColumn === 0 ? [] : (columns.get(headerColumn - 1) ?? []);

  const selected: number[] = [];

  for (const [index, column] of columns) {
    const position: number = index + 1;

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
 * Removes the columns a predicate selects.
 *
 * The column counterpart of {@link deleteRowsByConditional}, with the same
 * hazard and the same answer: deleting a column shifts every column to its
 * right one place left, so a left-to-right loop that deletes as it goes skips
 * columns. The matches are collected first, then removed right to left, with
 * adjacent matches taken out in one call.
 *
 * Removing every column a sheet has is refused, because a sheet cannot have
 * none and the service reports that with a message that does not say which
 * call caused it. Columns past the data range are not candidates, so a sheet
 * with spare empty columns is unaffected by that rule.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * deleteColumnsByConditional(sheet, (values) => values.every((cell) => cell === ""));
 *
 * deleteColumnsByConditional(sheet, (values, position, record) => record.Region === "n/a", {
 *   headerColumn: 1
 * });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to delete columns from.
 * @param       {ColumnPredicate} predicate - Decides whether a column is selected.
 * @param       {ColumnConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many columns were removed.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, `headerColumn` is not a positive integer, or every column would be removed.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link clearColumnsByConditional}
 * @see         {@link deleteRowsByConditional}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function deleteColumnsByConditional(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  predicate: ColumnPredicate,
  options: ColumnConditionalOptions | null | undefined = {}
): number {
  requireSheet(sheet);

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

  const values: unknown[][] = sheet.getDataRange().getValues();

  const selected: number[] = selectColumns(values, predicate, headerColumn);

  if (selected.length > 0 && selected.length === sheet.getMaxColumns()) {
    throw new IllegalArgumentException(
      "Refusing to delete every column: a sheet must keep at least one."
    );
  }

  const blocks: Block[] = toBlocks(selected);

  // Right to left: removing a later block cannot move an earlier one.
  for (const block of blocks.reverse()) {
    sheet.deleteColumns(block.start, block.count);
  }

  return selected.length;
}
