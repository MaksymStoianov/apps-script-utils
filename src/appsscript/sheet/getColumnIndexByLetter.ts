import { IllegalArgumentException } from "../../exception";
import { requireNonEmptyString } from "../../lang";

/**
 * Converts a column letter (or combination of letters) into a column index.
 *
 * @example
 * ```javascript
 * getColumnIndexByLetter("A");   // Returns: 1
 * getColumnIndexByLetter("AA");  // Returns: 27
 * getColumnIndexByLetter("AZ");  // Returns: 52
 * ```
 *
 * @param       {string} letter - The column label (e.g., `'A'`, `'B'`, ..., `'AA'`).
 * @returns     {number | null} The corresponding column index.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getColumnLetterByIndex}
 * @see         {@link getColumnPositionByLetter}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function getColumnIndexByLetter(letter: string): number | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const upperCaseLetter = requireNonEmptyString(letter).toUpperCase();

  const PATTERN = /^[A-Z]+$/;

  if (!PATTERN.test(upperCaseLetter)) {
    throw new SyntaxError(
      `Invalid column letter format: "${letter}". Must contain only alphabetic characters.`
    );
  }

  let index = 0;

  const base = 26;

  const charCodeA = "A".charCodeAt(0);

  for (let i = 0; i < upperCaseLetter.length; i++) {
    index = index * base + (upperCaseLetter.charCodeAt(i) - charCodeA + 1);
  }

  return index - 1;
}
