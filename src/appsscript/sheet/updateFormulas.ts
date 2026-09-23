import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isFunction, isNil } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * Receives a formula and where it sits, and returns what should replace it.
 *
 * Returning the formula unchanged leaves the cell alone.
 *
 * @example
 * ```javascript
 * const rewrite = (formula, row, column) => formula.replace("Sheet1", "Data");
 * ```
 *
 * @see [FormulaTransformer on the documentation site](https://maksymstoianov.github.io/apps-script-utils/formulatransformer.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export type FormulaTransformer = (formula: string, row: number, column: number) => string;

/**
 * A cell's formula before and after the rewrite.
 */
interface Cell {
  before: string;
  after: string;
}

/**
 * A run of consecutive cells in one column, all of which are changing.
 */
interface Run {
  row: number;
  column: number;
  formulas: string[];
}

/**
 * Collects the changed cells into maximal runs down each column.
 *
 * Formulas are laid out in columns far more often than in rows, so grouping
 * vertically turns a filled column into a single write. The sheet is walked
 * row by row all the same, with one open run per column, which keeps the walk
 * free of index arithmetic over the matrix.
 *
 * @param   {Cell[][]} cells - Every cell, indexed by row then column.
 * @param   {number} firstRow - The one-based sheet row the cells start at.
 * @param   {number} firstColumn - The one-based sheet column the cells start at.
 * @returns {Run[]} One entry per contiguous block of changed cells.
 */
function toRuns(cells: Cell[][], firstRow: number, firstColumn: number): Run[] {
  const runs: Run[] = [];

  const open: Map<number, Run> = new Map();

  for (const [rowIndex, row] of cells.entries()) {
    for (const [columnIndex, cell] of row.entries()) {
      if (cell.after === cell.before) {
        open.delete(columnIndex);

        continue;
      }

      let run: Run | undefined = open.get(columnIndex);

      if (run === undefined) {
        run = { row: firstRow + rowIndex, column: firstColumn + columnIndex, formulas: [] };

        open.set(columnIndex, run);
        runs.push(run);
      }

      run.formulas.push(cell.after);
    }
  }

  return runs;
}

/**
 * Reads every formula on a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>,
 * rewrites the ones the caller changes, and writes them back.
 *
 * This is how a reference is repointed after a sheet is renamed, or a function
 * swapped across a workbook, without touching the cells one at a time.
 *
 * **It does not force a recalculation.** Apps Script has no API for that, and
 * the trick of rewriting cells with their own values is a different operation;
 * reach for this expecting a rewrite, not a refresh.
 *
 * The rewrite is given either as a function, called once per formula, or as a
 * map keyed by the **whole** formula, which replaces exact matches. Anything
 * subtler — a substring, a regular expression — is what the function form is
 * for.
 *
 * Cells that hold a value rather than a formula are never touched, and neither
 * are formulas the rewrite leaves unchanged: only changed cells are written,
 * grouped into contiguous runs down each column, which is one call for a
 * filled column. A whole-sheet `setFormulas` is deliberately not used, because
 * it writes an empty formula over every cell that holds a plain value and
 * clears it.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * updateFormulas(sheet, (formula) => formula.replace(/'Old Name'/g, "'New Name'"));
 *
 * updateFormulas(sheet, { "=SUM(A1:A10)": "=SUM(A1:A20)" });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet whose formulas are rewritten, or the range to rewrite within: only its cells are read and written.
 * @param       {FormulaTransformer | Record<string, string>} rewrite - A function called per formula, or a map keyed by the whole formula.
 * @returns     {number} How many cells were changed.
 * @throws      {@link IllegalArgumentException} If `rewrite` is neither a function nor an object.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [updateFormulas on the documentation site](https://maksymstoianov.github.io/apps-script-utils/updateformulas.html)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function updateFormulas(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  rewrite: FormulaTransformer | Record<string, string>
): number {
  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

  const isUsable: boolean = isFunction(rewrite) || (!isNil(rewrite) && typeof rewrite === "object");

  if (!isUsable) {
    throw new IllegalArgumentException(
      "Expected 'rewrite' to be a function or a map of formulas to their replacements."
    );
  }

  const transform: FormulaTransformer = isFunction(rewrite)
    ? (rewrite as FormulaTransformer)
    : (formula: string): string => {
        const replacement: unknown = Reflect.get(rewrite as object, formula);

        return typeof replacement === "string" ? replacement : formula;
      };

  const range: GoogleAppsScript.Spreadsheet.Range = within ?? sheet.getDataRange();

  const firstRow: number = range.getRow();

  const firstColumn: number = range.getColumn();

  const before: string[][] = range.getFormulas();

  const cells: Cell[][] = before.map((row: string[], rowIndex: number): Cell[] =>
    row.map(
      (formula: string, columnIndex: number): Cell => ({
        before: formula,
        // An empty string is a cell holding a value, not a formula. Leave it.
        after:
          formula === ""
            ? formula
            : transform(formula, firstRow + rowIndex, firstColumn + columnIndex)
      })
    )
  );

  let changed: number = 0;

  for (const run of toRuns(cells, firstRow, firstColumn)) {
    sheet
      .getRange(run.row, run.column, run.formulas.length, 1)
      .setFormulas(run.formulas.map((formula: string): string[] => [formula]));

    changed += run.formulas.length;
  }

  return changed;
}
