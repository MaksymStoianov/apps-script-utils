import { IllegalArgumentException } from "../../exception";
import { isString, requireNonEmptyString } from "../../lang";
import { parseA1Notation } from "./parseA1Notation";

/**
 * ## extractRangeFromA1Notation
 *
 * Extracts the **range part** from a full A1 notation string (e.g., `'Sheet1!A1:B2'` returns `'A1:B2'`).
 *
 * @param       {string} a1Notation - The A1 notation string (e.g., `'SheetName!A1:B2'`, `'A1:B2'`).
 * @returns     {string|null} The extracted range string (e.g., `'A1:B2'`), or `null`.
 * @throws      {Error}
 * @throws      {IllegalArgumentException}
 * @see         {@link parseA1Notation}
 * @see         {@link GridRange}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.6.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function extractRangeFromA1Notation(a1Notation: string): string | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const { a1Notation: range } = parseA1Notation(a1Notation);

  if (!isString(range)) {
    return null;
  }

  requireNonEmptyString(range);

  return range;
}
