import { IllegalArgumentException } from "../../exception";
import { isString } from "../../lang";
import { isValidSpreadsheetId } from "./isValidSpreadsheetId";

/** Recognises a value that is a Sheets URL rather than an id. */
const SHEETS_URL = /docs\.google\.com\/spreadsheets/;

/**
 * Ensures that the provided value is a valid spreadsheet identifier,
 * throwing an exception otherwise.
 *
 * When the value looks like a Sheets URL, the default message says so
 * instead of reporting a generic format error — passing the URL where the id
 * belongs is the usual mistake, and `openById` responds to it with a
 * "file not found" that sends people looking for a permissions problem.
 *
 * The check is on shape, not existence: a value that passes may still refer to
 * no file, or to one the script cannot open.
 *
 * @example
 * ```javascript
 * requireValidSpreadsheetId("1AbCdEfGhIjKlMnOpQrStUvWx");
 * requireValidSpreadsheetId("https://docs.google.com/spreadsheets/d/…/edit");
 * // Throws: Expected a spreadsheet id, but received a Sheets URL. Extract the id from it first.
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message] - Optional custom error message if the validation fails.
 * @returns     {string} The validated spreadsheet identifier.
 * @throws      {@link IllegalArgumentException} If the value is not a valid spreadsheet identifier.
 * @see         {@link isValidSpreadsheetId}
 * @see         {@link nonValidSpreadsheetId}
 * @see         [requireValidSpreadsheetId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireValidSpreadsheetId.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireValidSpreadsheetId(value: unknown, message?: string): string {
  if (!isValidSpreadsheetId(value)) {
    const looksLikeUrl = isString(value) && SHEETS_URL.test(value);

    throw new IllegalArgumentException(
      message ??
        (looksLikeUrl
          ? "Expected a spreadsheet id, but received a Sheets URL. Extract the id from it first."
          : "Expected a valid spreadsheet id.")
    );
  }

  return value;
}
