import { isValidSpreadsheetId } from "./isValidSpreadsheetId";

/**
 * Checks if the provided value is NOT a valid spreadsheet identifier.
 *
 * A full Sheets URL reports `true`: it is not an id, and passing one where an
 * id belongs is the usual mistake this guard catches.
 *
 * @example
 * ```javascript
 * nonValidSpreadsheetId("1AbCdEfGhIjKlMnOpQrStUvWx");  // => false
 * nonValidSpreadsheetId("hello world!");                // => true
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid spreadsheet identifier; otherwise, `false`.
 * @see         {@link isValidSpreadsheetId}
 * @see         {@link requireValidSpreadsheetId}
 * @see         [nonValidSpreadsheetId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonvalidspreadsheetid.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidSpreadsheetId(value: unknown): boolean {
  return !isValidSpreadsheetId(value);
}
