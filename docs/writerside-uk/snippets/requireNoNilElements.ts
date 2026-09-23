import { requireNoNilElements } from "apps-script-utils";

/**
 * Appends a contact row, refusing a row with a gap in it rather than writing a
 * blank cell that shows up as a bug days later.
 */
export function appendContact(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  name: string | null,
  email: string | null
): void {
  const row = requireNoNilElements([name, email], "name and email are both required");

  sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
}
