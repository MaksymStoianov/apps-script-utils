import { getColumnLetterByIndex } from "./getColumnLetterByIndex";

/**
 * Converts a column position into its corresponding column letter (or combination of letters).
 *
 * @param       {number} columnPosition - The zero-based column position (e.g., `1` for 'A').
 * @returns     {string} The alphabetical representation of the column.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getColumnPositionByLetter}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function getColumnLetterByPosition(columnPosition: number): string {
  return getColumnLetterByIndex(columnPosition - 1);
}
