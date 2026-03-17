import { IllegalArgumentException } from "../../exception";
import { isNull, nonNull, requireNonEmptyString, toInteger } from "../../lang";
import { getColumnIndexByLetter } from "./getColumnIndexByLetter";
import { getColumnLetterByIndex } from "./getColumnLetterByIndex";
import type { GridRange } from "./types";

const SHEET_AND_RANGE_REGEX =
  /^(?:'(?<sQuoteSheet>[^']*(?:''[^']*)*)'|"(?<dQuoteSheet>[^"]*(?:""[^"]*)*)"|(?<simpleSheet>[A-Z][A-Z0-9_]*))!(?<a1Range>.*)$/i;

const A1_RANGE_REGEX =
  /^(?<startCol>[A-Z]*)(?<startRow>\d*)(?::(?<endCol>[A-Z]*)(?<endRow>\d*))?$/i;

/**
 * Parses an A1 notation string into a <a href="./types/GridRange.ts"><code>GridRange</code></a> object.
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
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @see         {@link parseA1Notations}
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
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

  const { sheetName, rangePart } = splitSheetAndRange(trimmedInput);

  if (rangePart === "") {
    throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
  }

  const match = rangePart.match(A1_RANGE_REGEX);

  if (!match || !match.groups) {
    throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
  }

  const { startCol, startRow, endCol, endRow } = match.groups;

  const hasColon = rangePart.includes(":");

  let sRow = startRow ? toInteger(startRow)! - 1 : null;

  let sCol = startCol ? getColumnIndexByLetter(startCol) : null;

  let eRow = endRow ? toInteger(endRow)! - 1 : null;

  let eCol = endCol ? getColumnIndexByLetter(endCol) : null;

  if (hasColon) {
    if (isNull(sRow) && isNull(eRow)) {
      sRow = 0;
    } else if (isNull(sCol) && isNull(eCol)) {
      sCol = 0;
    } else if (
      nonNull(sRow) &&
      nonNull(sCol) &&
      nonNull(eCol) &&
      isNull(eRow)
    ) {
      // Keep eRow as null (unbounded)
    } else if (
      isNull(sRow) &&
      nonNull(sCol) &&
      nonNull(eCol) &&
      nonNull(eRow)
    ) {
      sRow = 0;
    }
  } else {
    if (nonNull(sCol) && nonNull(sRow)) {
      eRow = sRow;
      eCol = sCol;
    } else if (nonNull(sCol)) {
      sRow = 0;
      eCol = sCol;
    } else if (nonNull(sRow)) {
      sCol = 0;
      eRow = sRow;
    } else {
      throw new SyntaxError(`"${a1Notation}" is not a valid A1 notation.`);
    }
  }

  // Normalize: ensure start <= end if both are present
  if (nonNull(sRow) && nonNull(eRow) && sRow > eRow) {
    [sRow, eRow] = [eRow, sRow];
  }

  if (nonNull(sCol) && nonNull(eCol) && sCol > eCol) {
    [sCol, eCol] = [eCol, sCol];
  }

  const startRowIndex = sRow;

  const endRowIndex = nonNull(eRow) ? eRow + 1 : null;

  const startColumnIndex = sCol;

  const endColumnIndex = nonNull(eCol) ? eCol + 1 : null;

  const canonicalA1Notation = generateCanonicalA1({
    startCol: startCol || null,
    startRow: startRow || null,
    endCol: endCol || null,
    endRow: endRow || null,
    hasColon,
    startRowIndex,
    endRowIndex,
    startColumnIndex,
    endColumnIndex
  });

  return {
    sheetName,
    a1Notation: canonicalA1Notation,
    startRowIndex,
    endRowIndex,
    startColumnIndex,
    endColumnIndex
  };
}

/**
 * Splits input into sheet name and range part.
 */
function splitSheetAndRange(input: string): {
  sheetName: string | null;
  rangePart: string;
} {
  const match = input.match(SHEET_AND_RANGE_REGEX);

  if (match && match.groups) {
    const { sQuoteSheet, dQuoteSheet, simpleSheet, a1Range } = match.groups;

    let sheetName: string | null = null;

    if (sQuoteSheet !== undefined) {
      sheetName = sQuoteSheet.replace(/''/g, "'");
    } else if (dQuoteSheet !== undefined) {
      sheetName = dQuoteSheet.replace(/""/g, '"');
    } else if (simpleSheet !== undefined) {
      sheetName = simpleSheet;
    }

    return { sheetName, rangePart: a1Range };
  }

  return { sheetName: null, rangePart: input };
}

/**
 * Generates canonical A1 notation.
 */
function generateCanonicalA1(params: {
  startCol: string | null;
  startRow: string | null;
  endCol: string | null;
  endRow: string | null;
  hasColon: boolean;
  startRowIndex: number | null;
  endRowIndex: number | null;
  startColumnIndex: number | null;
  endColumnIndex: number | null;
}): string {
  const {
    startCol,
    startRow,
    endCol,
    endRow,
    hasColon,
    startRowIndex,
    endRowIndex,
    startColumnIndex,
    endColumnIndex
  } = params;

  const sColLetter = nonNull(startColumnIndex)
    ? getColumnLetterByIndex(startColumnIndex)
    : "";

  const sRowNum = nonNull(startRowIndex) ? startRowIndex + 1 : "";

  // Single cell case
  if (
    !hasColon &&
    nonNull(startColumnIndex) &&
    nonNull(startRowIndex) &&
    nonNull(endColumnIndex) &&
    nonNull(endRowIndex) &&
    startColumnIndex === endColumnIndex - 1 &&
    startRowIndex === endRowIndex - 1
  ) {
    return `${sColLetter}${sRowNum}`;
  }

  // Single column case (B -> B:B)
  if (
    !hasColon &&
    nonNull(startColumnIndex) &&
    nonNull(endColumnIndex) &&
    startRowIndex === 0 &&
    isNull(endRowIndex)
  ) {
    return `${sColLetter}:${sColLetter}`;
  }

  // Single row case (5 -> 5:5)
  if (
    !hasColon &&
    nonNull(startRowIndex) &&
    nonNull(endRowIndex) &&
    startColumnIndex === 0 &&
    isNull(endColumnIndex)
  ) {
    return `${sRowNum}:${sRowNum}`;
  }

  // B2:B2 -> B2
  if (
    hasColon &&
    nonNull(startColumnIndex) &&
    nonNull(startRowIndex) &&
    nonNull(endColumnIndex) &&
    nonNull(endRowIndex) &&
    startColumnIndex === endColumnIndex - 1 &&
    startRowIndex === endRowIndex - 1
  ) {
    return `${sColLetter}${sRowNum}`;
  }

  // Column range (A:B)
  if (
    hasColon &&
    nonNull(startColumnIndex) &&
    nonNull(endColumnIndex) &&
    startRowIndex === 0 &&
    isNull(endRowIndex) &&
    startCol &&
    endCol &&
    !startRow &&
    !endRow
  ) {
    const eColLetter = getColumnLetterByIndex(endColumnIndex - 1);

    return `${sColLetter}:${eColLetter}`;
  }

  // Special GAS Cases for B:B if it was parsed from B
  if (
    !hasColon &&
    nonNull(startColumnIndex) &&
    nonNull(endColumnIndex) &&
    startRowIndex === 0 &&
    isNull(endRowIndex)
  ) {
    return `${sColLetter}:${sColLetter}`;
  }

  if (hasColon) {
    const eColLetter = nonNull(endColumnIndex)
      ? getColumnLetterByIndex(endColumnIndex - 1)
      : "";

    const eRowNum = nonNull(endRowIndex) ? endRowIndex : "";

    if (startCol && startRow && endCol && endRow) {
      return `${sColLetter}${sRowNum}:${eColLetter}${eRowNum}`;
    }

    if (startCol && endCol && !startRow && !endRow) {
      return `${sColLetter}:${eColLetter}`;
    }

    if (startRow && endRow && !startCol && !endCol) {
      return `${sRowNum}:${eRowNum}`;
    }

    if (startCol && startRow && endCol && !endRow) {
      return `${sColLetter}${sRowNum}:${eColLetter}`;
    }

    if (startCol && endCol && endRow && !startRow) {
      return `${sColLetter}:${eColLetter}${eRowNum}`;
    }
  }

  // Fallback for some GAS weirdness if we can't match logic above, but it should be valid A1
  // But original code throws SyntaxError here if it doesn't match specific combinations.
  throw new SyntaxError(`Invalid A1 notation.`);
}
