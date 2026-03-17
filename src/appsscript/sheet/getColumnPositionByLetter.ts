import { IllegalArgumentException } from "../../exception";
import { getColumnIndexByLetter } from "./getColumnIndexByLetter";

/**
 * Converts a column letter (or combination of letters) into a column position.
 *
 * @param       {string} letter - The column label (e.g., `'A'`, `'B'`, ..., `'AA'`).
 * @returns     {number | null} The corresponding column position.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getColumnLetterByPosition}
 * @see         {@link getColumnLetterByIndex}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function getColumnPositionByLetter(letter: string): number | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const index = getColumnIndexByLetter(letter);

  return index ? index + 1 : null;
}
