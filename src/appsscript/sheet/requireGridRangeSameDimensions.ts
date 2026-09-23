import { InvalidGridRangeException } from "../../exception";
import { isGridRangeSameDimensions } from "./isGridRangeSameDimensions";
import type { GridRange } from "./types";

/** Renders a grid range as `rows × columns`, or `unknown` when a bound is missing. */
function describeShape(gridRange: GridRange): string {
  const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } = gridRange ?? {};

  if (
    startRowIndex == null ||
    endRowIndex == null ||
    startColumnIndex == null ||
    endColumnIndex == null
  ) {
    return "unknown";
  }

  return `${endRowIndex - startRowIndex} × ${endColumnIndex - startColumnIndex}`;
}

/**
 * Ensures that two grid ranges have the same dimensions,
 * throwing an exception otherwise.
 *
 * The guard for a copy or a paste between ranges, where mismatched shapes
 * otherwise fail inside the Apps Script call. The default message reports both
 * shapes as `rows × columns`, which is the information needed to fix the call.
 *
 * @example
 * ```javascript
 * requireGridRangeSameDimensions(source, target);
 * // Throws: Expected grid ranges of equal dimensions, but received 3 × 2 and 1 × 1.
 * ```
 *
 * @param       {GridRange} range1 - The first grid range.
 * @param       {GridRange} range2 - The second grid range.
 * @param       {string} [message] - Optional custom error message if the validation fails.
 * @returns     {void}
 * @throws      {@link InvalidGridRangeException} If the two ranges do not have the same dimensions.
 * @see         {@link isGridRangeSameDimensions}
 * @see         {@link nonGridRangeSameDimensions}
 * @see         {@link GridRange}
 * @see         [requireGridRangeSameDimensions on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requiregridrangesamedimensions.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireGridRangeSameDimensions(
  range1: GridRange,
  range2: GridRange,
  message?: string
): void {
  if (!isGridRangeSameDimensions(range1, range2)) {
    throw new InvalidGridRangeException(
      message ??
        `Expected grid ranges of equal dimensions, but received ${describeShape(range1)} and ${describeShape(range2)}.`
    );
  }
}
