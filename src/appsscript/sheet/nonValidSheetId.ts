import { isValidSheetId } from "./isValidSheetId";

/**
 * Checks if the provided value is NOT a valid sheet identifier.
 *
 * A sheet id is a non-negative integer, so fractions, `Infinity` and values
 * past the safe integer range all report `true` here.
 *
 * @example
 * ```javascript
 * nonValidSheetId(-1); // => true
 * nonValidSheetId(1.5); // => true
 * nonValidSheetId("0"); // => true
 * nonValidSheetId(0); // => false
 * nonValidSheetId(1234567890); // => false
 * ```
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
