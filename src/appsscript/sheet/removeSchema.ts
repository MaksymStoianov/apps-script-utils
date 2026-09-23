import { isNil } from "../../lang";
import { SCHEMA_METADATA_KEY } from "./insertSchema";
import { requireSheet } from "./requireSheet";
import { type SheetSchema } from "./types";

/**
 * What else to take off the sheet along with the stored schema.
 *
 * @example
 * ```javascript
 * const options = { validation: true };
 * ```
 *
 * @since   1.11.0
 * @version 1.0.0
 */
export interface RemoveSchemaOptions {
  /**
   * Also clear the data validation on the columns the schema described.
   *
   * Off by default, and deliberately so. Apps Script gives no way to tell
   * which rule came from a schema and which a person added by hand, so
   * clearing them removes both. Ask for it only when the schema is known to
   * be the only thing that put rules on those columns.
   */
  validation?: boolean;
}

/**
 * Takes a schema off a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>,
 * and optionally the validation rules that came with it.
 *
 * **Cell values are never touched**, in either mode: this removes the
 * description of the sheet, not its contents, and the headers stay where they
 * are.
 *
 * Clearing validation is opt-in because Apps Script cannot say which rule came
 * from a schema and which a person added by hand — clearing them removes both.
 * Rules are only ever cleared on the columns the stored schema described; a
 * sheet carrying no schema has nothing to attribute them to, so nothing is
 * cleared.
 *
 * Calling this on a sheet that carries no schema does nothing and reports
 * `false`.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
 *
 * removeSchema(sheet);                        // => true, the metadata is gone
 * removeSchema(sheet);                        // => false, there was nothing left
 * removeSchema(other, { validation: true });  // also clears the rules it applied
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to take the schema off.
 * @param       {RemoveSchemaOptions | null} [options] - Additional parameters to customize the method's behavior.
 * @returns     {boolean} `true` if a stored schema was removed, `false` if there was none.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link insertSchema}
 * @see         {@link getSchema}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function removeSchema(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  options: RemoveSchemaOptions | null | undefined = {}
): boolean {
  requireSheet(sheet);

  let stored: SheetSchema | null = null;

  let removed: boolean = false;

  for (const metadata of sheet.getDeveloperMetadata()) {
    if (metadata.getKey() !== SCHEMA_METADATA_KEY) {
      continue;
    }

    if (stored === null) {
      try {
        const parsed: unknown = JSON.parse(metadata.getValue() ?? "");

        if (!isNil(parsed) && typeof parsed === "object") {
          stored = parsed as SheetSchema;
        }
      } catch {
        // Unreadable, but still this library's metadata: take it off anyway.
        stored = null;
      }
    }

    metadata.remove();

    removed = true;
  }

  if (options?.validation !== true || stored === null) {
    return removed;
  }

  const headerRow: number = isNil(stored.headerRow) ? 1 : stored.headerRow;

  const width: number = stored.columns?.length ?? 0;

  const height: number = Math.max(sheet.getMaxRows() - headerRow, 0);

  if (width > 0 && height > 0) {
    sheet.getRange(headerRow + 1, 1, height, width).clearDataValidations();
  }

  return removed;
}
