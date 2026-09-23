import { last } from "apps-script-utils";

/**
 * Logs the ten newest entries of a log sheet, oldest of the ten first.
 */
export function logRecentEntries(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  const rows = sheet.getDataRange().getValues().slice(1);

  for (const row of last(rows, 10)) {
    Logger.log(row.join(" | "));
  }
}
