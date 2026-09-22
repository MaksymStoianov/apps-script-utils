import { InvalidGridRangeException } from "../../exception";
import { isCellGridRange } from "./isCellGridRange";
import type { GridRange } from "./types";

/**
 * Ensures that the given grid range denotes exactly one cell,
 * throwing an exception otherwise.
 *
 * A range with an open-ended bound is rejected as well: without all four
 * indices it cannot be shown to cover a single cell.
 *
 * @example
 * ```javascript
 * requireCellGridRange({ startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 });
 * requireCellGridRange({ startRowIndex: 0, endRowIndex: 5, startColumnIndex: 0, endColumnIndex: 1 });
 * // Throws InvalidGridRangeException
 * ```
 *
 * @param       {unknown} value - The value to validate as a single-cell grid range.
 * @param       {string} [message="Expected a grid range covering exactly one cell."] - Optional custom error message if the validation fails.
 * @returns     {GridRange} The validated grid range.
 * @throws      {@link InvalidGridRangeException} If the value does not denote exactly one cell.
 * @see         {@link isCellGridRange}
 * @see         {@link nonCellGridRange}
 * @see         {@link GridRange}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireCellGridRange(
  value: unknown,
  message: string = "Expected a grid range covering exactly one cell."
): GridRange {
  if (!isCellGridRange(value as GridRange)) {
    throw new InvalidGridRangeException(message);
  }

  return value as GridRange;
}
