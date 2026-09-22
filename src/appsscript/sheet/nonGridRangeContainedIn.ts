import { isGridRangeContainedIn } from "./isGridRangeContainedIn";
import type { GridRange } from "./types";

/**
 * Checks if the first grid range is NOT contained within the second.
 *
 * Reports `true` whenever containment cannot be established: the inner range
 * extends past the container, the two name different sheets, or an argument is
 * not an object at all. Note that a range equal to its container **is**
 * contained, so an identical pair reports `false`.
 *
 * @param       {GridRange} gridRange - The grid range to test.
 * @param       {GridRange} containerGridRange - The grid range expected to contain it.
 * @returns     {boolean} `true` if the first range is not contained within the second; otherwise, `false`.
 * @see         {@link isGridRangeContainedIn}
 * @see         {@link requireGridRangeContainedIn}
 * @see         {@link GridRange}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonGridRangeContainedIn(
  gridRange: GridRange,
  containerGridRange: GridRange
): boolean {
  return !isGridRangeContainedIn(gridRange, containerGridRange);
}
