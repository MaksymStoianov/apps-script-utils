import { chunk } from "apps-script-utils";

/**
 * Appends rows in batches, so that one oversized `setValues` call cannot
 * exhaust the execution time limit.
 */
export function appendRows(sheet: GoogleAppsScript.Spreadsheet.Sheet, rows: string[][]): void {
  for (const batch of chunk(rows, 500)) {
    sheet.getRange(sheet.getLastRow() + 1, 1, batch.length, batch[0].length).setValues(batch);
  }
}
