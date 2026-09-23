import { transpose } from "apps-script-utils";

/**
 * Writes a flat list down a column. `setValues` wants one row per cell, which
 * is the transpose of a single row.
 */
export function writeColumn(sheet: GoogleAppsScript.Spreadsheet.Sheet, values: string[]): void {
  const column = transpose([values]);

  sheet.getRange(1, 1, column.length, 1).setValues(column);
}
