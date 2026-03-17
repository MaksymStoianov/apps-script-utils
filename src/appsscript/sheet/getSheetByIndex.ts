import { IllegalArgumentException } from "../../exception";
import { isCountable, isEmpty } from "../../lang";

/**
 * Retrieves a Google Sheet by its position (index) in the spreadsheet
 *
 * @param       {number} sheetIndex - The zero-based index of the sheet (0 is the first sheet).
 * @param       {GoogleAppsScript.Spreadsheet.Spreadsheet | null} [spreadsheet] - The Spreadsheet object to search within. Defaults to the active Spreadsheet if not provided.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet | null} The {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object if found, otherwise `null`.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getSheetById}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function getSheetByIndex(
  sheetIndex: number,
  spreadsheet?: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined | null
): GoogleAppsScript.Spreadsheet.Sheet | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!(sheetIndex === 0 || isCountable(sheetIndex))) {
    throw new IllegalArgumentException();
  }

  const ss = spreadsheet || SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    return null;
  }

  const sheets = ss.getSheets();

  if (isEmpty(sheets)) {
    return null;
  }

  return sheets[sheetIndex] ?? null;
}
