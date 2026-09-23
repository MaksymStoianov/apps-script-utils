import { InvalidGridRangeException } from "../../exception";
import { isGridRangeContainedIn } from "./isGridRangeContainedIn";
import type { GridRange } from "./types";

/** Renders a grid range as `rows a–b, columns c–d`, leaving open bounds as `…`. */
function describeBounds(gridRange: GridRange): string {
  const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } = gridRange ?? {};

  const bound = (value: number | null | undefined): string => (value == null ? "…" : `${value}`);

  return `rows ${bound(startRowIndex)}–${bound(endRowIndex)}, columns ${bound(startColumnIndex)}–${bound(endColumnIndex)}`;
}

/**
 * Ensures that the first grid range lies within the second,
 * throwing an exception otherwise.
 *
 * Containment is not strict: a range equal to its container passes. A
 * container with no bounds is treated as unbounded, so anything fits inside
 * an empty range.
 *
 * The default message describes both ranges, since "not contained" alone
 * gives nothing to act on.
 *
 * @example
 * ```javascript
 * requireGridRangeContainedIn(selection, dataRange);
 * // Throws: Expected rows 2–20, columns 1–3 to lie within rows 0–10, columns 0–5.
 * ```
 *
 * @param       {GridRange} gridRange - The grid range that must be contained.
 * @param       {GridRange} containerGridRange - The grid range expected to contain it.
 * @param       {string} [message] - Optional custom error message if the validation fails.
 * @returns     {GridRange} The validated inner grid range.
 * @throws      {@link InvalidGridRangeException} If the first range is not contained within the second.
 * @see         {@link isGridRangeContainedIn}
 * @see         {@link nonGridRangeContainedIn}
 * @see         {@link GridRange}
 * @see         [requireGridRangeContainedIn on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireGridRangeContainedIn.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireGridRangeContainedIn(
  gridRange: GridRange,
  containerGridRange: GridRange,
  message?: string
): GridRange {
  if (!isGridRangeContainedIn(gridRange, containerGridRange)) {
    throw new InvalidGridRangeException(
      message ??
        `Expected ${describeBounds(gridRange)} to lie within ${describeBounds(containerGridRange)}.`
    );
  }

  return gridRange;
}
