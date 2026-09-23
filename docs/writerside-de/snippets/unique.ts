import { unique } from "apps-script-utils";

/**
 * Lists every status used in a column, each one once, in the order they first
 * appear.
 */
export function listStatuses(sheet: GoogleAppsScript.Spreadsheet.Sheet): string[] {
  const column = sheet.getRange("C2:C").getValues().flat() as string[];

  return unique(column.filter((status: string): boolean => status !== ""));
}
