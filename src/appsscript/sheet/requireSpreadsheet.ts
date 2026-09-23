import { InvalidSpreadsheetException } from "../../exception";
import { isSpreadsheet } from "./isSpreadsheet";

/**
 * Ensures that the given value is a {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet} object.
 *
 * @example
 * ```javascript
 * const spreadsheet = SpreadsheetApp.getActive();
 *
 * requireSpreadsheet(spreadsheet); // => spreadsheet
 * requireSpreadsheet({}); // throws InvalidSpreadsheetException
 * requireSpreadsheet(null); // throws InvalidSpreadsheetException
 * ```
 *
 * @param   {unknown} value The value to check.
 * @param   {string} [message="Required Spreadsheet object is missing or invalid."] The error message to throw if the value is not a {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet}.
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} The {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet} object.
 * @throws  {InvalidSpreadsheetException} If the value is not a {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet}.
 * @since   1.5.0
 */
export function requireSpreadsheet(
  value: unknown,
  message: string = "Required Spreadsheet object is missing or invalid."
): GoogleAppsScript.Spreadsheet.Spreadsheet {
  if (!isSpreadsheet(value)) {
    throw new InvalidSpreadsheetException(message);
  }

  return value;
}
