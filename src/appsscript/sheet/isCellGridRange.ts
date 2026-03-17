import { InvalidGridRangeException } from "../../exception";
import { isObject, nonNil } from "../../lang";
import type { GridRange } from "./types";

/**
 * Checks if a given <a href="./types/GridRange.ts"><code>GridRange</code></a> represents a single cell.
 *
 * @param       {GridRange} gridRange - The <a href="./types/GridRange.ts"><code>GridRange</code></a> object to check.
 * @returns     {boolean} `true` if the range represents a single cell, `false` otherwise.
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     1.2.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isCellGridRange(gridRange: GridRange): boolean {
  if (!isObject(gridRange)) {
    throw new InvalidGridRangeException();
  }

  const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } =
    gridRange;

  if (
    nonNil(startRowIndex) &&
    nonNil(endRowIndex) &&
    nonNil(startColumnIndex) &&
    nonNil(endColumnIndex)
  ) {
    const isSingleRow = endRowIndex - startRowIndex === 1;

    const isSingleColumn = endColumnIndex - startColumnIndex === 1;

    return isSingleRow && isSingleColumn;
  }

  return false;
}
