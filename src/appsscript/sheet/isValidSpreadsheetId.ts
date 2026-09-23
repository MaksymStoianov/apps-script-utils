import { isString } from "../../lang";

/** Drive file ids are at least 25 characters from an unreserved alphabet. */
const PATTERN = /^[a-zA-Z0-9-_]{25,}$/;

/**
 * Checks if the provided value is a valid spreadsheet identifier.
 *
 * A spreadsheet id is a Drive file id: at least 25 characters drawn from
 * letters, digits, hyphens and underscores. A full Sheets URL therefore fails
 * — extract the id from it first.
 *
 * The check is on shape, not existence: a value that passes may still refer to
 * no file, or to one the script cannot open.
 *
 * @example
 * ```javascript
 * isValidSpreadsheetId("1AbCdEfGhIjKlMnOpQrStUvWx");  // => true
 * isValidSpreadsheetId("hello world!");                // => false
 * isValidSpreadsheetId("https://docs.google.com/…");   // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a valid spreadsheet identifier; otherwise, `false`.
 * @see         {@link nonValidSpreadsheetId}
 * @see         {@link requireValidSpreadsheetId}
 * @see         {@link isValidPresentationId}
 * @see         [isValidSpreadsheetId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isValidSpreadsheetId.html)
 * @since       1.5.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidSpreadsheetId(value: unknown): value is string {
  return isString(value) && PATTERN.test(value);
}
