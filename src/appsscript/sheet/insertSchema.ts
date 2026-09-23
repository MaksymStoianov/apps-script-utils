import { IllegalArgumentException } from "../../exception";
import { isArray, isNil, isString, requireCountable } from "../../lang";
import { requireSheet } from "./requireSheet";
import { type SheetColumnSchema, type SheetSchema } from "./types";

/**
 * The developer-metadata key a sheet's schema is stored under.
 */
export const SCHEMA_METADATA_KEY: string = "apps-script-utils:schema";

/**
 * Rejects anything that is not a usable schema.
 *
 * @param   {unknown} schema - The value to check.
 * @returns {SheetSchema} The schema, with its header row defaulted.
 * @throws  {@link IllegalArgumentException} If the value is not a usable schema.
 */
function requireSchema(schema: unknown): SheetSchema {
  if (isNil(schema) || typeof schema !== "object") {
    throw new IllegalArgumentException("Expected a schema object.");
  }

  const candidate: Partial<SheetSchema> = schema as Partial<SheetSchema>;

  if (!isArray(candidate.columns) || candidate.columns.length === 0) {
    throw new IllegalArgumentException("Expected the schema to name at least one column.");
  }

  for (const column of candidate.columns) {
    if (isNil(column) || !isString((column as SheetColumnSchema).name)) {
      throw new IllegalArgumentException("Expected every column to have a name.");
    }
  }

  const headerRow: number = isNil(candidate.headerRow) ? 1 : candidate.headerRow;

  requireCountable(headerRow, "Expected 'headerRow' to be a positive integer.");

  if (headerRow < 1) {
    throw new IllegalArgumentException("Expected 'headerRow' to be a positive integer.");
  }

  return { version: 1, headerRow, columns: candidate.columns };
}

/**
 * Removes any schema this sheet already carries, so re-applying one replaces
 * it rather than stacking a second copy beside it.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to clean.
 */
function removeStoredSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  for (const metadata of sheet.getDeveloperMetadata()) {
    if (metadata.getKey() === SCHEMA_METADATA_KEY) {
      metadata.remove();
    }
  }
}

/**
 * Applies a declarative description of a sheet — its column names, number
 * formats and accepted values — to an actual sheet, and records it there.
 *
 * The schema is stored as
 * <a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata"><code>DeveloperMetadata</code></a>
 * on the sheet rather than in a hidden sheet or re-derived from the header
 * row. That keeps it invisible to the people using the spreadsheet, and
 * unaffected by their row edits. {@link getSchema} reads it back and
 * {@link removeSchema} takes it off.
 *
 * Applying the same schema twice changes nothing: the headers are written to
 * the same cells, the formats and rules are the same, and the stored copy
 * replaces its predecessor rather than joining it.
 *
 * Existing headers are overwritten. Nothing below the header row is touched,
 * so applying a schema to a populated sheet renames its columns without
 * disturbing the data under them.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
 *
 * insertSchema(sheet, {
 *   headerRow: 1,
 *   columns: [
 *     { name: "Id", type: "string" },
 *     { name: "Placed", type: "date", format: "yyyy-mm-dd" },
 *     { name: "Status", type: "string", values: ["new", "paid", "void"] }
 *   ]
 * });
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to apply the schema to.
 * @param       {SheetSchema} schema - The schema to apply. `headerRow` defaults to `1`.
 * @returns     {GoogleAppsScript.Spreadsheet.Sheet} The sheet.
 * @throws      {@link IllegalArgumentException} If the schema names no columns, or a column has no name.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link getSchema}
 * @see         {@link removeSchema}
 * @see         [insertSchema on the documentation site](https://maksymstoianov.github.io/apps-script-utils/insertSchema.html)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class DataValidation](https://developers.google.com/apps-script/reference/spreadsheet/data-validation)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function insertSchema(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  schema: SheetSchema
): GoogleAppsScript.Spreadsheet.Sheet {
  requireSheet(sheet);

  const normalised: SheetSchema = requireSchema(schema);

  const names: unknown[] = normalised.columns.map(
    (column: SheetColumnSchema): unknown => column.name
  );

  sheet.getRange(normalised.headerRow, 1, 1, names.length).setValues([names]);

  const firstDataRow: number = normalised.headerRow + 1;

  const maxRows: number = sheet.getMaxRows();

  const height: number = Math.max(maxRows - normalised.headerRow, 0);

  for (const [index, column] of normalised.columns.entries()) {
    if (height === 0) {
      break;
    }

    const cells: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(
      firstDataRow,
      index + 1,
      height,
      1
    );

    if (!isNil(column.format)) {
      cells.setNumberFormat(column.format);
    }

    if (isArray(column.values) && column.values.length > 0) {
      const rule: GoogleAppsScript.Spreadsheet.DataValidation = SpreadsheetApp.newDataValidation()
        .requireValueInList(column.values as string[], true)
        .setAllowInvalid(column.allowInvalid === true)
        .build();

      cells.setDataValidation(rule);
    }
  }

  removeStoredSchema(sheet);

  sheet.addDeveloperMetadata(SCHEMA_METADATA_KEY, JSON.stringify(normalised));

  return sheet;
}
