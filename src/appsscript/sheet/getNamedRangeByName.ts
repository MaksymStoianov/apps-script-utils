import { requireNonEmptyString } from "../../lang";
import { requireSpreadsheet } from "./requireSpreadsheet";

/**
 * Retrieves a named range by its name.
 *
 * <a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getnamedranges"><code>Spreadsheet.getNamedRanges</code></a>
 * returns an array with no lookup by name, so every caller writes the same
 * `find`. This makes exactly one such call per invocation.
 *
 * Matching is exact and case-sensitive. A range scoped to a single sheet
 * rather than to the workbook reports its name with the sheet prefixed —
 * `"Sheet1!rates"` — and must be asked for that way.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 *
 * getNamedRangeByName(ss, "rates")?.getRange().getValues();
 * getNamedRangeByName(ss, "Sheet1!rates"); // a sheet-scoped range
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet - The spreadsheet to search.
 * @param       {string} name - The exact name of the range.
 * @returns     {GoogleAppsScript.Spreadsheet.NamedRange | null} The named range, or `null` when the spreadsheet has none by that name.
 * @throws      {@link InvalidSpreadsheetException} If `spreadsheet` is not a Spreadsheet.
 * @throws      {@link EmptyStringException} If `name` is not a non-empty string.
 * @see         {@link getSheetById}
 * @see         [Class NamedRange](https://developers.google.com/apps-script/reference/spreadsheet/named-range)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function getNamedRangeByName(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  name: string
): GoogleAppsScript.Spreadsheet.NamedRange | null {
  requireSpreadsheet(spreadsheet);
  requireNonEmptyString(name);

  const namedRanges: GoogleAppsScript.Spreadsheet.NamedRange[] = spreadsheet.getNamedRanges();

  for (const namedRange of namedRanges) {
    if (namedRange.getName() === name) {
      return namedRange;
    }
  }

  return null;
}
