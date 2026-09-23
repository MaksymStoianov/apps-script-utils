import { intersect } from "apps-script-utils";

/**
 * Returns the identifiers that appear in both sheets, in the order of the
 * first one.
 */
export function findSharedIds(
  active: GoogleAppsScript.Spreadsheet.Sheet,
  billed: GoogleAppsScript.Spreadsheet.Sheet
): string[] {
  const left = active.getRange("A2:A").getValues().flat() as string[];

  const right = billed.getRange("A2:A").getValues().flat() as string[];

  return intersect(left, right);
}
