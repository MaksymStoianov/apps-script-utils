import { InvalidGridRangeException } from "../../exception";
import { isNil, isObject } from "../../lang";
import type { GridRange } from "./types";

/**
 * Checks if two <a href="./types/GridRange.ts"><code>GridRange</code></a> objects have the exact same number of rows and columns.
 *
 * @param       {GridRange} range1 - The first <a href="./types/GridRange.ts"><code>GridRange</code></a> object.
 * @param       {GridRange} range2 - The second <a href="./types/GridRange.ts"><code>GridRange</code></a> object.
 * @returns     {boolean} `true` if both ranges are well-defined and have the identical height (number of rows) and width (number of columns), `false` otherwise.
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isGridRangeSameDimensions(
  range1: GridRange,
  range2: GridRange
): boolean {
  if (!isObject(range1) || !isObject(range2)) {
    throw new InvalidGridRangeException();
  }

  const getDimensions = (
    gridRange: GridRange
  ): { height: number; width: number } | null => {
    const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } =
      gridRange;

    if (
      isNil(startRowIndex) ||
      isNil(endRowIndex) ||
      isNil(startColumnIndex) ||
      isNil(endColumnIndex)
    ) {
      return null;
    }

    const height = endRowIndex - startRowIndex;

    const width = endColumnIndex - startColumnIndex;

    if (height < 0 || width < 0) {
      return null;
    }

    return { height, width };
  };

  const dimensions1 = getDimensions(range1);

  const dimensions2 = getDimensions(range2);

  if (dimensions1 === null || dimensions2 === null) {
    return false;
  }

  return (
    dimensions1.height === dimensions2.height &&
    dimensions1.width === dimensions2.width
  );
}
