import { IllegalArgumentException } from "../../exception";
import { isCountable, isEmpty } from "../../lang";

/**
 * ## getSheetById
 *
 * Retrieves a Google Sheet by its unique ID.
 *
 * @param       sheetId - The unique ID of the sheet to retrieve.
 * @param       [ss] - The Spreadsheet object to search within. Defaults to the active Spreadsheet if not provided.
 * @returns     The {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet} object if found, otherwise `null`.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link getSheetByIndex}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`
 */
export function getSheetById(
  sheetId: number,
  ss?: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined | null
): GoogleAppsScript.Spreadsheet.Sheet | null {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!(sheetId === 0 || isCountable(sheetId))) {
    throw new IllegalArgumentException();
  }

  const sheets = (ss || SpreadsheetApp.getActiveSpreadsheet()).getSheets();

  if (isEmpty(sheets)) {
    return null;
  }

  for (const sheet of sheets) {
    if (sheet.getSheetId() === sheetId) {
      return sheet;
    }
  }

  return null;
}
