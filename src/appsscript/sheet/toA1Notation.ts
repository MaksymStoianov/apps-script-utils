import {
  IllegalArgumentException,
  InvalidGridRangeException
} from "../../exception";
import { isObject } from "../../lang";
import { getColumnLetterByIndex } from "./getColumnLetterByIndex";
import type { GridRange } from "./types";

/**
 * ## toA1Notation
 *
 * Converts a <a href="./types/GridRange.ts"><code>GridRange</code></a> object back into an A1 notation string.
 *
 * @example
 * ```javascript
 * const gridRange = {
 *  startRowIndex: 0,
 *  endRowIndex: 2,
 *  startColumnIndex: 0,
 *  endColumnIndex: 2
 * };
 *
 * const a1Notation = toA1Notation(gridRange);
 *
 * console.log(a1Notation); // A1:B2
 * ```
 *
 * @param       gridRange - The <a href="./types/GridRange.ts"><code>GridRange</code></a> object to convert.
 * @returns     The A1 notation string.
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @throws      <a href="../../exception/appsscript/sheet/InvalidGridRangeException.ts"><code>InvalidGridRangeException</code></a>
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function toA1Notation(gridRange: GridRange): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!isObject(gridRange)) {
    throw new InvalidGridRangeException();
  }

  const {
    sheetName,
    startRowIndex,
    endRowIndex,
    startColumnIndex,
    endColumnIndex
  } = gridRange;

  let rangePart = "";

  const hasStartRow = typeof startRowIndex === "number";
  const hasEndRow = typeof endRowIndex === "number";
  const hasStartCol = typeof startColumnIndex === "number";
  const hasEndCol = typeof endColumnIndex === "number";

  if (hasStartRow && startRowIndex < 0) {
    throw new Error("startRowIndex cannot be negative.");
  }

  if (hasStartCol && startColumnIndex < 0) {
    throw new Error("startColumnIndex cannot be negative.");
  }

  const a1StartRowNumber = hasStartRow ? (startRowIndex as number) + 1 : "";
  const a1EndRowNumber = hasEndRow ? (endRowIndex as number) : "";
  const a1StartColLetter = hasStartCol
    ? getColumnLetterByIndex(startColumnIndex as number)
    : "";
  const a1EndColLetter =
    hasEndCol && (endColumnIndex as number) > 0
      ? getColumnLetterByIndex((endColumnIndex as number) - 1)
      : "";

  if (
    hasStartCol &&
    hasStartRow &&
    hasEndCol &&
    hasEndRow &&
    (endColumnIndex as number) === (startColumnIndex as number) + 1 &&
    (endRowIndex as number) === (startRowIndex as number) + 1
  ) {
    rangePart = `${a1StartColLetter}${a1StartRowNumber}`;
  } else if (
    hasStartCol &&
    hasStartRow &&
    (startRowIndex as number) === 0 &&
    !hasEndRow
  ) {
    if (
      hasEndCol &&
      (endColumnIndex as number) > (startColumnIndex as number) + 1
    ) {
      rangePart = `${a1StartColLetter}:${a1EndColLetter}`;
    } else if (
      hasEndCol &&
      (endColumnIndex as number) === (startColumnIndex as number) + 1
    ) {
      rangePart = `${a1StartColLetter}:${a1StartColLetter}`;
    } else if (!hasEndCol) {
      rangePart = `${a1StartColLetter}:${a1StartColLetter}`;
    } else {
      throw new Error(
        `Invalid or incomplete GridRange object for full column A1 notation conversion.`
      );
    }
  } else if (
    hasStartRow &&
    hasStartCol &&
    (startColumnIndex as number) === 0 &&
    !hasEndCol
  ) {
    if (hasEndRow && (endRowIndex as number) > (startRowIndex as number) + 1) {
      rangePart = `${a1StartRowNumber}:${a1EndRowNumber}`;
    } else if (
      hasEndRow &&
      (endRowIndex as number) === (startRowIndex as number) + 1
    ) {
      rangePart = `${a1StartRowNumber}:${a1StartRowNumber}`;
    } else if (!hasEndRow) {
      rangePart = `${a1StartRowNumber}:${a1StartRowNumber}`;
    } else {
      throw new Error(
        `Invalid or incomplete GridRange object for full row A1 notation conversion.`
      );
    }
  } else if (hasStartCol && hasStartRow && hasEndCol && !hasEndRow) {
    rangePart = `${a1StartColLetter}${a1StartRowNumber}:${a1EndColLetter}`;
  } else if (hasStartCol && hasStartRow && hasEndCol && hasEndRow) {
    rangePart = `${a1StartColLetter}${a1StartRowNumber}:${a1EndColLetter}${a1EndRowNumber}`;
  } else {
    throw new Error(
      `Invalid or incomplete GridRange object for A1 notation conversion.`
    );
  }

  let fullA1Notation = "";
  if (sheetName !== null && sheetName !== undefined) {
    const isSimpleSheetName = /^[A-Z_][A-Z0-9_]*$/i.test(sheetName);

    if (!isSimpleSheetName) {
      if (!sheetName.includes("'")) {
        fullA1Notation += `'${sheetName}'!`;
      } else if (!sheetName.includes('"')) {
        fullA1Notation += `"${sheetName}"!`;
      } else {
        fullA1Notation += `'${sheetName.replace(/'/g, "''")}'!`;
      }
    } else {
      fullA1Notation += `${sheetName}!`;
    }
  }

  fullA1Notation += rangePart;

  return fullA1Notation;
}
