import { compact } from "apps-script-utils";

/**
 * Reads a column of identifiers and drops the blanks, without a cast:
 * `compact` returns `string[]`, not `Array<string | null>`.
 */
export function readIds(sheet: GoogleAppsScript.Spreadsheet.Sheet): string[] {
  const column = sheet.getRange("A2:A").getValues().flat() as Array<string | null>;

  return compact(column);
}
