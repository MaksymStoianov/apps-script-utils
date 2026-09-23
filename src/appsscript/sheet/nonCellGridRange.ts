import { isCellGridRange } from "./isCellGridRange";
import type { GridRange } from "./types";

/**
 * Checks if the given grid range does NOT denote exactly one cell.
 *
 * Reports `true` both for a range spanning more than one cell and for one
 * whose bounds are open-ended or missing, since neither can be shown to be a
 * single cell.
 *
 * @example
 * ```javascript
 * nonCellGridRange({ startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 1 }); // => true
 * nonCellGridRange({}); // => true
 * nonCellGridRange(null); // => true
 * nonCellGridRange({ startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 }); // => false
 * ```
 *
 * @param       {GridRange} gridRange - The grid range to check.
 * @returns     {boolean} `true` if the grid range does not denote a single cell; otherwise, `false`.
 * @see         {@link isCellGridRange}
 * @see         {@link requireCellGridRange}
 * @see         {@link GridRange}
 * @see         [nonCellGridRange on the documentation site](https://maksymstoianov.github.io/apps-script-utils/noncellgridrange.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonCellGridRange(gridRange: GridRange): boolean {
  return !isCellGridRange(gridRange);
}
