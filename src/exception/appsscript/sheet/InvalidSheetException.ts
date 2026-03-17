import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object is provided.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see     [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidSheetException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid Sheet object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
