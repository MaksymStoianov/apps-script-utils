/**
 * What a column holds, as far as a schema is concerned.
 *
 * @example
 * ```javascript
 * const type = "date";
 * ```
 *
 * @see [SheetColumnType on the documentation site](https://maksymstoianov.github.io/apps-script-utils/SheetColumnType.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export type SheetColumnType = "string" | "number" | "boolean" | "date";

/**
 * One column of a sheet's schema.
 *
 * @example
 * ```javascript
 * const column = { name: "created", type: "date" };
 * ```
 *
 * @see [SheetColumnSchema on the documentation site](https://maksymstoianov.github.io/apps-script-utils/SheetColumnSchema.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export interface SheetColumnSchema {
  /**
   * The column's heading, written into the header row.
   */
  name: string;

  /**
   * What the column holds.
   *
   * Absent means unconstrained. When `getSchema` guesses a type rather than
   * reading a declared one, `inferred` says so.
   */
  type?: SheetColumnType;

  /**
   * A
   * <a href="https://developers.google.com/sheets/api/guides/formats">number format</a>
   * applied to the column's cells, such as `"0.00%"` or `"yyyy-mm-dd"`.
   */
  format?: string;

  /**
   * The values the column accepts, applied as a one-of-list validation rule.
   */
  values?: unknown[];

  /**
   * Whether a value outside `values` is a warning rather than a rejection.
   *
   * Defaults to `false`, which rejects it.
   */
  allowInvalid?: boolean;

  /**
   * Set by `getSchema` on a column whose type it guessed from the data.
   *
   * A guess is not a declaration: a column of `"1"`, `"2"`, `"3"` may be
   * numbers, or identifiers that must stay strings, and the caller is the only
   * one who can tell.
   */
  inferred?: boolean;
}

/**
 * A declarative description of a sheet: its header row and its columns.
 *
 * A schema is stored on the sheet as developer metadata rather than in a
 * hidden sheet or re-derived from the header row, which keeps it invisible to
 * the people using the spreadsheet and unaffected by their row edits.
 *
 * @example
 * ```javascript
 * const schema = {
 *   version: 1,
 *   headerRow: 1,
 *   columns: [
 *     { name: "id", type: "number" },
 *     { name: "email", type: "string" }
 *   ]
 * };
 * ```
 *
 * @see [SheetSchema on the documentation site](https://maksymstoianov.github.io/apps-script-utils/SheetSchema.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export interface SheetSchema {
  /**
   * The format the schema was written in. Present so a later format can be
   * recognised rather than misread.
   */
  version: 1;

  /**
   * The one-based row holding the column names. Defaults to `1`.
   */
  headerRow: number;

  /**
   * The columns, left to right.
   */
  columns: SheetColumnSchema[];

  /**
   * Set by `getSchema` when no schema was stored and the whole description was
   * read off the sheet's own contents.
   */
  inferred?: boolean;
}
