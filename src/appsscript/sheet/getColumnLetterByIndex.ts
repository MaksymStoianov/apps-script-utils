import { IllegalArgumentException } from "../../exception";
import { isInteger } from "../../lang";

/**
 * Converts a column index into its corresponding column letter (or combination of letters).
 *
 * @example
 * ```javascript
 * getColumnLetterByIndex(0);   // Returns: A
 * getColumnLetterByIndex(26);  // Returns: AA
 * getColumnLetterByIndex(51);  // Returns: AZ
 * ```
 *
 * @param       {number} columnIndex - The zero-based column index (e.g., `0` for 'A').
 * @returns     {string} The alphabetical representation of the column.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getColumnIndexByLetter}
 * @see         {@link getColumnLetterByPosition}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function getColumnLetterByIndex(columnIndex: number): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!(isInteger(columnIndex) && columnIndex >= 0)) {
    throw new IllegalArgumentException();
  }

  let result = "";

  let temp = columnIndex + 1;

  while (temp > 0) {
    const remainder = (temp - 1) % 26;

    result = String.fromCharCode(65 + remainder) + result;
    temp = Math.floor((temp - 1) / 26);
  }

  return result;
}
