import { isValidSheetName } from "./isValidSheetName";

/**
 * Checks if the provided value is NOT a valid sheet name.
 *
 * Reports `true` for anything Google Sheets would refuse: an empty or
 * whitespace-only name, one longer than 100 characters, one containing
 * `\ / ? * [ ]`, or the reserved `History` in any casing.
 *
 * @example
 * ```javascript
 * nonValidSheetName("Report 2024");  // => false
 * nonValidSheetName("Q1/Q2");        // => true
 * nonValidSheetName("History");      // => true
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid sheet name; otherwise, `false`.
 * @see         {@link isValidSheetName}
 * @see         {@link requireValidSheetName}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidSheetName(value: unknown): boolean {
  return !isValidSheetName(value);
}
