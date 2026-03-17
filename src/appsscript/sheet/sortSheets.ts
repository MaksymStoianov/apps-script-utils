import { IllegalArgumentException } from "../../exception";
import { isSpreadsheet } from "./isSpreadsheet";

/**
 * Sorts all sheets in a spreadsheet alphabetically by name.
 *
 * @param       {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet - The spreadsheet object.
 * @param       {(a: string, b: string) => number} [callback] - An optional callback function for custom sorting.
 * @returns     {void}
 * @throws      {@link IllegalArgumentException}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.5.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function sortSheets(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  callback?: (a: string, b: string) => number
): void {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!isSpreadsheet(spreadsheet)) {
    throw new Error("Spreadsheet object is not valid.");
  }

  try {
    const sheets = spreadsheet.getSheets();

    if (sheets.length < 2) {
      return;
    }

    const sheetNames = sheets.map(sheet => sheet.getName());

    sheetNames.sort(callback);

    sheetNames.forEach(function (name, i) {
      const sheet = spreadsheet.getSheetByName(name);

      if (sheet && sheet.getIndex() !== i + 1) {
        spreadsheet.setActiveSheet(sheet);
        spreadsheet.moveActiveSheet(i + 1);
      }
    });
  } catch (err: unknown) {
    console.error(`Failed to sort sheets: ${err}`);
  }
}
