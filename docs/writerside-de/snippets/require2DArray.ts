import { require2DArray } from "apps-script-utils";

/**
 * Validates the argument at the boundary of the function, with a message that
 * names the argument, and uses the validated value in the same expression.
 */
export function writeRows(sheet: GoogleAppsScript.Spreadsheet.Sheet, values: unknown): void {
  const rows = require2DArray<string>(values, "values must be a matrix of rows");

  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}
