/**
 * A range on a sheets.
 *
 * @example
 * ```javascript
 * // A1:B2 on the first sheet.
 * const range = {
 *   sheetId: 0,
 *   startRowIndex: 0,
 *   endRowIndex: 2,
 *   startColumnIndex: 0,
 *   endColumnIndex: 2
 * };
 * ```
 *
 * @see [GridRange on the documentation site](https://maksymstoianov.github.io/apps-script-utils/GridRange.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export interface GridRange {
  /**
   * The sheets this range is on.
   */
  sheetId?: number | null;

  /**
   * The name of the sheet this range is on.
   */
  sheetName?: string | null;

  /**
   *
   */
  a1Notation?: string | null;

  /**
   * The start row (inclusive) of the range, or not set if unbounded.
   */
  startRowIndex?: number | null;

  /**
   * The end row (exclusive) of the range, or not set if unbounded.
   */
  endRowIndex?: number | null;

  /**
   * The start column (inclusive) of the range, or not set if unbounded.
   */
  startColumnIndex?: number | null;

  /**
   * The end column (exclusive) of the range, or not set if unbounded.
   */
  endColumnIndex?: number | null;
}
