import { isString, nonEmpty } from "../../lang";

/**
 * ## isValidSheetName
 *
 * Checks if the given value is a valid [sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet) name.
 * A valid sheet name, according to this function, is a non-empty string.
 *
 * @param       value The value to check.
 * @returns     `true` if the value is a non-empty string, `false` otherwise.
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.0.1
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidSheetName(value: unknown): value is string {
  return isString(value) && nonEmpty(value);
}
