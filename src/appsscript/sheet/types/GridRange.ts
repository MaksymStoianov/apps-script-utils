/**
 * A range on a sheets.
 *
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
