import { isValidSheetId } from "./isValidSheetId";

/**
 * Checks if the provided value is NOT a valid sheet identifier.
 *
 * A sheet id is a non-negative integer, so fractions, `Infinity` and values
 * past the safe integer range all report `true` here.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid sheet identifier; otherwise, `false`.
 * @see         {@link isValidSheetId}
 * @see         {@link requireValidSheetId}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidSheetId(value: unknown): boolean {
  return !isValidSheetId(value);
}
