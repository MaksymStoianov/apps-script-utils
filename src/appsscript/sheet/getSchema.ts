import { isNil } from "../../lang";
import { SCHEMA_METADATA_KEY } from "./insertSchema";
import { requireSheet } from "./requireSheet";
import { type SheetColumnSchema, type SheetColumnType, type SheetSchema } from "./types";

/**
 * Reads the schema a sheet carries, if it carries one.
 *
 * @param   {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to read.
 * @returns {SheetSchema | null} The stored schema, or `null` when there is none or it cannot be read.
 */
function readStoredSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): SheetSchema | null {
  for (const metadata of sheet.getDeveloperMetadata()) {
    if (metadata.getKey() !== SCHEMA_METADATA_KEY) {
      continue;
    }

    try {
      const parsed: unknown = JSON.parse(metadata.getValue() ?? "");

      if (!isNil(parsed) && typeof parsed === "object") {
        return parsed as SheetSchema;
      }
    } catch {
      // Metadata written by something else, or truncated. Fall through to
      // inference rather than failing the read.
      return null;
    }
  }

  return null;
}

/**
 * Guesses what a column holds from the values in it.
 *
 * @param   {unknown[]} values - The column's values, below the header.
 * @returns {SheetColumnType | undefined} The guessed type, or `undefined` when there is nothing to go on.
 */
function inferType(values: unknown[]): SheetColumnType | undefined {
  const present: unknown[] = values.filter(
    (value: unknown): boolean => value !== "" && !isNil(value)
  );

  if (present.length === 0) {
    return undefined;
  }

  if (present.every((value: unknown): boolean => value instanceof Date)) {
    return "date";
  }

  if (present.every((value: unknown): boolean => typeof value === "number")) {
    return "number";
  }

  if (present.every((value: unknown): boolean => typeof value === "boolean")) {
    return "boolean";
  }

  return "string";
}

/**
 * Returns the schema of a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>:
 * the one {@link insertSchema} stored on it, or one read off its contents when
 * it carries none.
 *
 * **A guessed type is not a declared one, and the result says which it is.**
 * A column of `"1"`, `"2"`, `"3"` may be numbers, or identifiers that must
 * stay strings, and only the caller can tell. Every guessed column carries
 * `inferred: true`, and a schema that was guessed in its entirety carries it
 * at the top level too, so the two are never mistaken for each other.
 *
 * Inference reads the first row as the column names and takes the type from
 * the values under each: all dates give `date`, all numbers `number`, all
 * booleans `boolean`, anything mixed `string`. A column with nothing in it
 * gets no type at all rather than a guess.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
 *
 * getSchema(sheet);
 * // => { version: 1, headerRow: 1, columns: [...] } — as stored
 *
 * getSchema(otherSheet);
 * // => { version: 1, headerRow: 1, inferred: true, columns: [{ name: "Id", type: "number", inferred: true }] }
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to describe.
 * @returns     {SheetSchema | null} The schema, or `null` for a sheet with nothing to describe.
 * @throws      {@link InvalidSheetException} If `sheet` is not a Sheet.
 * @see         {@link insertSchema}
 * @see         {@link removeSchema}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function getSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): SheetSchema | null {
  requireSheet(sheet);

  const stored: SheetSchema | null = readStoredSchema(sheet);

  if (stored !== null) {
    return stored;
  }

  const values: unknown[][] = sheet.getDataRange().getValues();

  const [headers = []]: unknown[][] = values.slice(0, 1);

  if (headers.length === 0) {
    return null;
  }

  // Collect each column's values below the header without indexing the matrix.
  const byColumn: Map<number, unknown[]> = new Map();

  for (const row of values.slice(1)) {
    for (const [index, cell] of row.entries()) {
      const column: unknown[] = byColumn.get(index) ?? [];

      column.push(cell);
      byColumn.set(index, column);
    }
  }

  const columns: SheetColumnSchema[] = headers.map(
    (header: unknown, index: number): SheetColumnSchema => {
      const type: SheetColumnType | undefined = inferType(byColumn.get(index) ?? []);

      const column: SheetColumnSchema = { name: String(header), inferred: true };

      if (!isNil(type)) {
        column.type = type;
      }

      return column;
    }
  );

  return { version: 1, headerRow: 1, inferred: true, columns };
}
