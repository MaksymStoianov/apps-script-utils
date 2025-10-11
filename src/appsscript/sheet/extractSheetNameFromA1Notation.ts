import { IllegalArgumentException } from "../../exception";
import { isString } from "../../lang";
import { isValidSheetName } from "./isValidSheetName";
import { parseA1Notation } from "./parseA1Notation";

/**
 * ## extractSheetNameFromA1Notation
 *
 * Extracts the sheet name from an A1 notation string (e.g., `Sheet1!A1:B2`).
 *
 * This function returns the sheet name as a clean string, or `null` if the
 * notation contains only the range part (e.g., `A1:B2`).
 *
 * @param       {string} a1Notation - The A1 notation string (e.g., `SheetName!A1`, `Sheet Name'!A:A`).
 * @returns     {string|null} The extracted sheet name, or `null` if no sheet name is present in the notation.
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
export function extractSheetNameFromA1Notation(
  a1Notation: string
): string | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const { sheetName } = parseA1Notation(a1Notation);

  if (!isString(sheetName)) {
    return null;
  }

  if (!isValidSheetName(sheetName)) {
    throw new Error("Expected a valid sheet name");
  }

  return sheetName;
}
