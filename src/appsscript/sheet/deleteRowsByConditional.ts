import { IllegalArgumentException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { type RowConditionalOptions, type RowPredicate } from "./clearRowsByConditional";
import { requireSheet } from "./requireSheet";

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
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to delete rows from.
 * @param       {RowPredicate} predicate - Decides whether a row is selected.
 * @param       {RowConditionalOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {number} How many rows were removed.
 * @throws      {@link IllegalArgumentException} If `predicate` is not a function, `headerRow` is not a positive integer, or every row would be removed.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link clearRowsByConditional}
 * @see         {@link deleteColumnsByConditional}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function deleteRowsByConditional(
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

  const values: unknown[][] = sheet.getDataRange().getValues();

  const selected: number[] = selectRows(values, predicate, headerRow);

  if (selected.length > 0 && selected.length === sheet.getMaxRows()) {
    throw new IllegalArgumentException(
      "Refusing to delete every row: a sheet must keep at least one."
    );
  }

  const blocks: Block[] = toBlocks(selected);

  // Bottom upwards: removing a later block cannot move an earlier one.
  for (const block of blocks.reverse()) {
    sheet.deleteRows(block.start, block.count);
  }

  return selected.length;
}
