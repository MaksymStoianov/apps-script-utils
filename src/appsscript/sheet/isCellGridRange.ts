import { isObject, nonNil } from "../../lang";
import type { GridRange } from "./types";

/**
 * Checks if a given <a href="./types/GridRange.ts"><code>GridRange</code></a> represents a single cell.
 *
 * @example
 * ```javascript
 * isCellGridRange({ startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 1 }); // => true
 * isCellGridRange({ startRowIndex: 0, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 1 }); // => false
 * isCellGridRange({}); // => false
 * isCellGridRange(null); // => false
 * ```
 *
 * @param       {GridRange} gridRange - The <a href="./types/GridRange.ts"><code>GridRange</code></a> object to check.
 * @returns     {boolean} `true` if the range represents a single cell, `false` otherwise.
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @see         [isCellGridRange on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isCellGridRange.html)
 * @since       1.0.0
 * @version     1.2.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isCellGridRange(gridRange: GridRange): boolean {
  if (!isObject(gridRange)) {
    return false;
  }

  const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } = gridRange;

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
