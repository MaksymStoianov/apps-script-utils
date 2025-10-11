import { IllegalArgumentException } from "../../exception";
import { requireNonEmptyString, toInteger } from "../../lang";
import { getColumnIndexByLetter } from "./getColumnIndexByLetter";
import { getColumnLetterByIndex } from "./getColumnLetterByIndex";
import type { GridRange } from "./types";

/**
 * ## parseA1Notation
 *
 * Parses an A1 notation string into a {@link GridRange} object.
 *
 * @example 1
 * ```javascript
 * const range = SpreadsheetApp.getActiveRange();
 * const a1Notation = range.getA1Notation();
 * const result = parseA1Notation(a1Notation);
 *
 * console.log(result);
 * ```
 *
 * @example 2
 * ```javascript
 * parseA1Notation("A1:AZ10");
 * parseA1Notation("B5");
 * parseA1Notation("5:15");
 * parseA1Notation("M:X");
 * parseA1Notation("B2:B2");
 * parseA1Notation("B");
 * parseA1Notation("5");
 * parseA1Notation("15:5");
 * parseA1Notation("15:M5");
 * parseA1Notation("Sheet1!A1:B2");
 * parseA1Notation("'Sheet name'!A1:B2");
 * ```
 *
 * @param       {string} a1Notation - The A1 notation string to parse.
 * @returns     {GridRange} An object representing the parsed grid range.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link parseA1Notations}
 * @see         {@link GridRange}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function parseA1Notation(a1Notation: string): GridRange {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const trimmedInput = requireNonEmptyString(a1Notation).trim();

  let sheetName: string | null = null;
  let rangeA1Part: string;

  const SHEET_AND_RANGE_REGEX =
    /^(?:'(?<sQuoteSheet>(?:[^']|'')*)'|"(?<dQuoteSheet>(?:[^"]|"")*)"|(?<simpleSheet>[A-Z]+[A-Z0-9_]*))!(?<a1Range>[A-Z]*\d*(?::[A-Z]*\d*)?)$/i;

  const sheetMatch = trimmedInput.match(SHEET_AND_RANGE_REGEX);

  if (sheetMatch && sheetMatch.groups) {
    const { sQuoteSheet, dQuoteSheet, simpleSheet, a1Range } =
      sheetMatch.groups;

    if (sQuoteSheet !== undefined) {
      sheetName = sQuoteSheet.replace(/''/g, "'");
    } else if (dQuoteSheet !== undefined) {
      sheetName = dQuoteSheet.replace(/""/g, '"');
    } else if (simpleSheet !== undefined) {
      sheetName = simpleSheet;
    }

    rangeA1Part = a1Range;
  } else {
    rangeA1Part = trimmedInput;
  }

  if (rangeA1Part === "") {
    throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
  }

  const upperCasedA1RangePart = rangeA1Part.toUpperCase();

  const A1_RANGE_REGEX =
    /^(?<startCol>[A-Z]*)(?<startRow>\d*)?(?::(?<endCol>[A-Z]*)(?<endRow>\d*)?)?$/;

  const rangeMatch = upperCasedA1RangePart.match(A1_RANGE_REGEX);

  if (!rangeMatch || !rangeMatch.groups) {
    throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
  }

  const { startCol, startRow, endCol, endRow } = rangeMatch.groups;

  const hasColon = upperCasedA1RangePart.includes(":");

  let currentStartRowIndex: number | null = null;
  if (startRow) {
    currentStartRowIndex = toInteger(startRow)! - 1;
  }

  let currentStartColumnIndex: number | null = null;
  if (startCol) {
    currentStartColumnIndex = getColumnIndexByLetter(startCol);
  }

  let currentEndRowIndex: number | null = null;
  let currentEndColumnIndex: number | null = null;

  if (hasColon) {
    if (endRow) {
      currentEndRowIndex = toInteger(endRow)! - 1;
    }
    if (endCol) {
      currentEndColumnIndex = getColumnIndexByLetter(endCol);
    }

    if (currentStartRowIndex === null && currentEndRowIndex === null) {
      currentStartRowIndex = 0;
      currentEndRowIndex = null;
    } else if (
      currentStartColumnIndex === null &&
      currentEndColumnIndex === null
    ) {
      currentStartColumnIndex = 0;
      currentEndColumnIndex = null;
    } else if (
      currentStartRowIndex !== null &&
      currentStartColumnIndex !== null &&
      currentEndColumnIndex !== null &&
      currentEndRowIndex === null
    ) {
      currentEndRowIndex = null;
    } else if (
      currentStartRowIndex === null &&
      currentStartColumnIndex !== null &&
      currentEndColumnIndex !== null &&
      currentEndRowIndex !== null
    ) {
      currentStartRowIndex = 0;
    }
  } else {
    if (currentStartColumnIndex !== null && currentStartRowIndex !== null) {
      currentEndRowIndex = currentStartRowIndex;
      currentEndColumnIndex = currentStartColumnIndex;
    } else if (
      currentStartColumnIndex !== null &&
      currentStartRowIndex === null
    ) {
      currentStartRowIndex = 0;
      currentEndRowIndex = null;
      currentEndColumnIndex = currentStartColumnIndex;
    } else if (
      currentStartRowIndex !== null &&
      currentStartColumnIndex === null
    ) {
      currentStartColumnIndex = 0;
      currentEndColumnIndex = null;
      currentEndRowIndex = currentStartRowIndex;
    } else {
      throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
    }
  }

  if (
    currentStartRowIndex !== null &&
    currentEndRowIndex !== null &&
    currentStartRowIndex > currentEndRowIndex
  ) {
    [currentStartRowIndex, currentEndRowIndex] = [
      currentEndRowIndex,
      currentStartRowIndex
    ];
  }
  if (
    currentStartColumnIndex !== null &&
    currentEndColumnIndex !== null &&
    currentStartColumnIndex > currentEndColumnIndex
  ) {
    [currentStartColumnIndex, currentEndColumnIndex] = [
      currentEndColumnIndex,
      currentStartColumnIndex
    ];
  }

  const finalEndRowIndex =
    currentEndRowIndex !== null ? currentEndRowIndex + 1 : null;
  const finalEndColumnIndex =
    currentEndColumnIndex !== null ? currentEndColumnIndex + 1 : null;

  let canonicalA1Notation = "";
  const normalizedStartColLetter =
    currentStartColumnIndex !== null
      ? getColumnLetterByIndex(currentStartColumnIndex)
      : "";
  const normalizedStartRowNumber =
    currentStartRowIndex !== null ? currentStartRowIndex + 1 : "";

  if (
    currentStartColumnIndex !== null &&
    currentStartRowIndex !== null &&
    finalEndColumnIndex !== null &&
    finalEndRowIndex !== null &&
    currentStartColumnIndex === finalEndColumnIndex - 1 &&
    currentStartRowIndex === finalEndRowIndex - 1
  ) {
    canonicalA1Notation = `${normalizedStartColLetter}${normalizedStartRowNumber}`;
  } else if (
    currentStartColumnIndex !== null &&
    currentEndColumnIndex === null &&
    currentStartRowIndex === 0 &&
    currentEndRowIndex === null
  ) {
    const endColLetter =
      finalEndColumnIndex !== null
        ? getColumnLetterByIndex(finalEndColumnIndex - 1)
        : normalizedStartColLetter;
    canonicalA1Notation = `${normalizedStartColLetter}:${endColLetter}`;
  } else if (
    currentStartRowIndex !== null &&
    currentEndRowIndex === null &&
    currentStartColumnIndex === 0 &&
    currentEndColumnIndex === null
  ) {
    const endRowNumber =
      finalEndRowIndex !== null ? finalEndRowIndex : normalizedStartRowNumber;
    canonicalA1Notation = `${normalizedStartRowNumber}:${endRowNumber}`;
  } else if (hasColon) {
    const initialEndColLetter =
      currentEndColumnIndex !== null
        ? getColumnLetterByIndex(currentEndColumnIndex)
        : "";
    const initialEndRowNumber =
      currentEndRowIndex !== null ? currentEndRowIndex + 1 : "";

    if (startCol && startRow && endCol && endRow) {
      canonicalA1Notation = `${normalizedStartColLetter}${normalizedStartRowNumber}:${initialEndColLetter}${initialEndRowNumber}`;
    } else if (startCol && endCol && !startRow && !endRow) {
      canonicalA1Notation = `${normalizedStartColLetter}:${initialEndColLetter}`;
    } else if (startRow && endRow && !startCol && !endCol) {
      canonicalA1Notation = `${normalizedStartRowNumber}:${initialEndRowNumber}`;
    } else if (startCol && startRow && endCol && !endRow) {
      canonicalA1Notation = `${normalizedStartColLetter}${normalizedStartRowNumber}:${initialEndColLetter}`;
    } else if (startCol && endCol && endRow && !startRow) {
      canonicalA1Notation = `${normalizedStartColLetter}:${initialEndColLetter}${initialEndRowNumber}`;
    } else {
      throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
    }
  } else if (
    currentStartColumnIndex !== null &&
    currentEndColumnIndex !== null &&
    currentStartRowIndex === 0 &&
    currentEndRowIndex === null
  ) {
    canonicalA1Notation = `${normalizedStartColLetter}:${normalizedStartColLetter}`;
  } else if (
    currentStartRowIndex !== null &&
    currentEndRowIndex !== null &&
    currentStartColumnIndex === 0 &&
    currentEndColumnIndex === null
  ) {
    canonicalA1Notation = `${normalizedStartRowNumber}:${normalizedStartRowNumber}`;
  } else {
    throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
  }

  return {
    sheetName,
    a1Notation: canonicalA1Notation,
    startRowIndex: currentStartRowIndex,
    endRowIndex: finalEndRowIndex,
    startColumnIndex: currentStartColumnIndex,
    endColumnIndex: finalEndColumnIndex
  };
}
