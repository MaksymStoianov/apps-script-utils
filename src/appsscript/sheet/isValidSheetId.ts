import { isCountable } from "../../lang";

/**
 * Checks if the provided value is a valid sheet identifier.
 *
 * A sheet id — the `gid` in a Sheets URL — is a non-negative integer. `0` is
 * valid: it is the id of the first sheet of every spreadsheet.
 *
 * The check is on shape, not existence: a value that passes may still refer to
 * no sheet in the target spreadsheet.
 *
 * @example
 * ```javascript
 * isValidSheetId(0);      // => true
 * isValidSheetId(1.5);    // => false
 * isValidSheetId(-1);     // => false
 * isValidSheetId("0");    // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a valid sheet identifier; otherwise, `false`.
 * @see         {@link nonValidSheetId}
 * @see         {@link requireValidSheetId}
 * @see         {@link getSheetById}
 * @see         [isValidSheetId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isvalidsheetid.html)
 * @since       1.5.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidSheetId(value: unknown): value is number {
  return isCountable(value);
}
