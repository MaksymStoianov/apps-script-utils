import { isGridRangeSameDimensions } from "./isGridRangeSameDimensions";
import type { GridRange } from "./types";

/**
 * Checks if two grid ranges do NOT have the same dimensions.
 *
 * Reports `true` whenever equality cannot be established: the shapes genuinely
 * differ, a bound is open-ended, a range is inverted, or an argument is not an
 * object at all.
 *
 * @example
 * ```javascript
 * const source = { startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 2 };
 * const target = { startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 2 };
 *
 * nonGridRangeSameDimensions(source, target); // => true
 * ```
 *
 * @param       {GridRange} range1 - The first grid range.
 * @param       {GridRange} range2 - The second grid range.
 * @returns     {boolean} `true` if the two ranges do not have the same dimensions; otherwise, `false`.
 * @see         {@link isGridRangeSameDimensions}
 * @see         {@link requireGridRangeSameDimensions}
 * @see         {@link GridRange}
 * @see         [nonGridRangeSameDimensions on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonGridRangeSameDimensions.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonGridRangeSameDimensions(range1: GridRange, range2: GridRange): boolean {
  return !isGridRangeSameDimensions(range1, range2);
}
