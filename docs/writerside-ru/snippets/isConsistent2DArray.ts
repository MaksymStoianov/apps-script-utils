import { isConsistent2DArray } from "apps-script-utils";

/**
 * Writes a matrix to a sheet, refusing a ragged one with a message that says
 * what is wrong — which `setValues` itself does not.
 */
export function write(sheet: GoogleAppsScript.Spreadsheet.Sheet, rows: unknown): void {
  if (!isConsistent2DArray(rows)) {
    throw new Error("Every row must have the same number of columns.");
  }

  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}
