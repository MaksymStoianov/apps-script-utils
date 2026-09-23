import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet} object is provided.
 *
 * @example
 * ```javascript
 * throw new InvalidSpreadsheetException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof InvalidSpreadsheetException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet}
 * @see     [Class Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet)
 * @see     [InvalidSpreadsheetException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/invalidspreadsheetexception.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidSpreadsheetException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid Spreadsheet object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
