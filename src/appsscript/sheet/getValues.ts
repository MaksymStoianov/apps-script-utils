import { IllegalArgumentException, InvalidSheetException } from "../../exception";
import { isFunction, isNil, requireCountable } from "../../lang";
import { isRange } from "./isRange";
import { isSheet } from "./isSheet";

/**
 * A row, as the predicate and the mapper see it.
 *
 * @example
 * ```javascript
 * // What a filter receives when `headerRow` is set.
 * const row = {
 *   values: ["7", "ada@example.com"],
 *   position: 2,
 *   record: { id: "7", email: "ada@example.com" }
 * };
 * ```
 *
 * @see [Row on the documentation site](https://maksymstoianov.github.io/apps-script-utils/Row.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export interface Row {
  /**
   * The row's cells, left to right.
   */
  values: unknown[];

  /**
   * The row's one-based position on the sheet.
   */
  position: number;

  /**
   * The row keyed by the header row, or `null` when no header is configured.
   */
  record: Record<string, unknown> | null;
}

/**
 * How {@link getValues} reads, narrows and shapes the data.
 *
 * @example
 * ```javascript
 * const config = {
 *   headerRow: 1,
 *   filter: (row) => row.record.status === "active",
 *   limit: 100
 * };
 * ```
 *
 * @see [GetValuesConfig on the documentation site](https://maksymstoianov.github.io/apps-script-utils/GetValuesConfig.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export interface GetValuesConfig {
  /**
   * The one-based row holding the column names.
   *
   * Setting it turns each row into an object keyed by those names, and takes
   * the header row — and anything above it, such as a title — out of the
   * result.
   *
   * Where a name repeats, the leftmost column wins and the later ones are
   * reachable only through `values`.
   */
  headerRow?: number;

  /**
   * Read the values as the user sees them rather than as they are stored.
   *
   * This is not cosmetic. Stored values are typed — a date arrives as a `Date`
   * and a percentage as `0.15` — while displayed values are the formatted
   * strings in the cells, `"15%"` among them. Both are wanted in different
   * situations, so neither is baked in.
   */
  display?: boolean;

  /**
   * How many matching rows to skip. Applied after `filter`.
   */
  offset?: number;

  /**
   * How many matching rows to return at most. Applied after `offset`.
   */
  limit?: number;

  /**
   * Keeps only the rows for which this returns `true`.
   */
  filter?: (row: Row) => boolean;

  /**
   * Turns each surviving row into whatever the caller wants back.
   */
  mapper?: (row: Row) => unknown;
}

/**
 * Reads a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>sheet</code></a>
 * and hands back either a matrix or an array of objects keyed by the header
 * row.
 *
 * This is the function most Apps Script projects reimplement first, and the
 * reason is quota: reading a whole sheet is one call, but the loop people
 * write afterwards to turn rows into objects often calls back into the API per
 * row. Here everything after the single read — keying, filtering, paging,
 * mapping — happens in memory.
 *
 * The steps run in a fixed order: read, drop the header row, `filter`,
 * `offset`, `limit`, `mapper`. Paging therefore counts matching rows, not
 * sheet rows, which is what makes `offset` and `limit` usable with a `filter`.
 *
 * @example
 * ```javascript
 * const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
 *
 * getValues(sheet);
 * // => [["Name", "Age"], ["Ada", 36]]
 *
 * getValues(sheet, { headerRow: 1 });
 * // => [{ Name: "Ada", Age: 36 }]
 *
 * getValues(sheet, {
 *   headerRow: 1,
 *   filter: ({ record }) => record.Age > 30,
 *   mapper: ({ record }) => record.Name
 * });
 * // => ["Ada"]
 *
 * getValues(sheet, { display: true });
 * // => [["Name", "Age"], ["Ada", "36"]]
 * ```
 *
 * @template    T - What each element of the result is, once a mapper has had its say.
 * @param       {GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range} target - The sheet to read, or the range to read: only its cells are fetched, and the rest of the sheet is not.
 * @param       {GetValuesConfig | null} [config] - How to read, narrow and shape the data.
 * @returns     {T[]} The rows: arrays, or objects when a header row is configured, or whatever the mapper returns.
 * @throws      {@link IllegalArgumentException} If any of the configured values is of the wrong kind.
 * @throws      {@link InvalidSheetException} If the first argument is neither a Sheet nor a Range.
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [getValues on the documentation site](https://maksymstoianov.github.io/apps-script-utils/getValues.html)
 * @since       1.11.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 */
export function getValues<T = unknown>(
  target: GoogleAppsScript.Spreadsheet.Sheet | GoogleAppsScript.Spreadsheet.Range,
  config: GetValuesConfig | null | undefined = {}
): T[] {
  const within = isRange(target) ? target : null;

  const sheet = within ? within.getSheet() : target;

  if (!isSheet(sheet)) {
    throw new InvalidSheetException();
  }

  const {
    headerRow = 0,
    display = false,
    offset = 0,
    limit,
    filter,
    mapper
  }: GetValuesConfig = config ?? {};

  if (headerRow !== 0) {
    requireCountable(headerRow, "Expected 'headerRow' to be a positive integer.");

    if (headerRow < 1) {
      throw new IllegalArgumentException("Expected 'headerRow' to be a positive integer.");
    }
  }

  requireCountable(offset, "Expected 'offset' to be a non-negative safe integer.");

  if (!isNil(limit)) {
    requireCountable(limit, "Expected 'limit' to be a non-negative safe integer.");
  }

  if (!isNil(filter) && !isFunction(filter)) {
    throw new IllegalArgumentException("Expected 'filter' to be a function.");
  }

  if (!isNil(mapper) && !isFunction(mapper)) {
    throw new IllegalArgumentException("Expected 'mapper' to be a function.");
  }

  const range: GoogleAppsScript.Spreadsheet.Range = within ?? sheet.getDataRange();

  const raw: unknown[][] = display ? range.getDisplayValues() : range.getValues();

  const firstRow: number = range.getRow();

  const headerIndex: number = headerRow === 0 ? 0 : headerRow - firstRow;

  const [headers = []]: unknown[][] =
    headerRow === 0 || headerIndex < 0 ? [[]] : raw.slice(headerIndex, headerIndex + 1);

  const rows: Row[] = [];

  for (const [index, values] of raw.entries()) {
    const position: number = firstRow + index;

    // Everything from the header row upwards is heading, not data: a title
    // above the column names is not a row anyone asked for.
    if (position <= headerRow) {
      continue;
    }

    let record: Record<string, unknown> | null = null;

    if (headerRow !== 0) {
      record = {};

      for (const [column, cell] of values.entries()) {
        const [header = ""] = headers.slice(column, column + 1);

        const name: string = String(header);

        // The leftmost column of a repeated name wins; the later ones stay
        // reachable through `values`.
        if (!Object.prototype.hasOwnProperty.call(record, name)) {
          Reflect.set(record, name, cell);
        }
      }
    }

    rows.push({ values, position, record });
  }

  const matching: Row[] = isNil(filter) ? rows : rows.filter((row: Row): boolean => filter(row));

  const end: number | undefined = isNil(limit) ? undefined : offset + limit;

  const page: Row[] = matching.slice(offset, end);

  if (!isNil(mapper)) {
    return page.map((row: Row): T => mapper(row) as T);
  }

  return page.map((row: Row): T => (row.record ?? row.values) as T);
}
