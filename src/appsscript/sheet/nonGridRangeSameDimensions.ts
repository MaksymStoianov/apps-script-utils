import { isGridRangeSameDimensions } from "./isGridRangeSameDimensions";
import type { GridRange } from "./types";

/**
 * Checks if two grid ranges do NOT have the same dimensions.
 *
 * Reports `true` whenever equality cannot be established: the shapes genuinely
 * differ, a bound is open-ended, a range is inverted, or an argument is not an
 * object at all.
 *
 * @param       {GridRange} range1 - The first grid range.
 * @param       {GridRange} range2 - The second grid range.
 * @returns     {boolean} `true` if the two ranges do not have the same dimensions; otherwise, `false`.
 * @see         {@link isGridRangeSameDimensions}
 * @see         {@link requireGridRangeSameDimensions}
 * @see         {@link GridRange}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonGridRangeSameDimensions(range1: GridRange, range2: GridRange): boolean {
  return !isGridRangeSameDimensions(range1, range2);
}
