import { requireConsistent2DArray } from "apps-script-utils";

/**
 * Accepts only a matrix whose rows are all the same width. The default message
 * names the offending row and both widths.
 */
export function writeMatrix(sheet: GoogleAppsScript.Spreadsheet.Sheet, values: unknown): void {
  const rows = requireConsistent2DArray<string>(values);

  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}
