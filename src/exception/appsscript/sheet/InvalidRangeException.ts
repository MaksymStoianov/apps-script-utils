import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Spreadsheet.Range|Range} object is provided.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see     [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidRangeException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid Range object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
