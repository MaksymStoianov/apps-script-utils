import { IllegalArgumentException, isEmpty } from "apps-script-utils";
import { isCountable } from "./isCountable";

/**
 * ## getSheetById
 *
 * Retrieves a Google Sheet by its position (index) in the spreadsheet
 *
 * @param       sheetIndex - The zero-based index of the sheet (0 is the first sheet).
 * @param       [spreadsheet] - The Spreadsheet object to search within. Defaults to the active Spreadsheet if not provided.
 * @returns     The {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object if found, otherwise `null`.
 * @throws      {@link IllegalArgumentException}
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
    throw new IllegalArgumentException(
      "The sheetIndex must be a valid number."
    );
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
