import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet} object is provided.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Spreadsheet.Spreadsheet|Spreadsheet}
 * @see     [Class Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet)
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
