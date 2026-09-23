import { first } from "apps-script-utils";

/**
 * Splits a sheet into its header row and its data rows, and says so when the
 * sheet turns out to be empty.
 */
export function readTable(sheet: GoogleAppsScript.Spreadsheet.Sheet): {
  header: string[];
  rows: string[][];
} {
  const values = sheet.getDataRange().getValues() as string[][];

  const header = first(values);

  if (!header) {
    throw new Error("The sheet is empty.");
  }

  return { header, rows: values.slice(1) };
}
