import { isString } from "../../lang";

/** Google Sheets rejects these characters anywhere in a sheet name. */
const FORBIDDEN_CHARACTERS = /[\\/?*[\]]/;

/** Google Sheets caps a sheet name at 100 characters. */
const MAX_LENGTH = 100;

/** Google Sheets reserves this name, regardless of case. */
const RESERVED_NAME = "history";

/**
 * Checks if the provided value is a valid sheet name.
 *
 * Google Sheets rejects a name that is empty, longer than 100 characters,
 * contains any of `\ / ? * [ ]`, or is `History` in any casing. This check
 * applies the same rules, so a name that passes here will be accepted by
 * `insertSheet` rather than failing at the call.
 *
 * Surrounding whitespace is significant to Sheets and is not trimmed here
 * either — a name of only spaces is rejected as empty.
 *
 * @example
 * ```javascript
 * isValidSheetName("Report 2024");  // => true
 * isValidSheetName("Q1/Q2");        // => false
 * isValidSheetName("History");      // => false
 * isValidSheetName("");             // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a valid sheet name; otherwise, `false`.
 * @see         {@link nonValidSheetName}
 * @see         {@link requireValidSheetName}
 * @since       1.5.0
 * @version     1.1.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidSheetName(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  if (value.trim().length === 0 || value.length > MAX_LENGTH) {
    return false;
  }

  if (FORBIDDEN_CHARACTERS.test(value)) {
    return false;
  }

  return value.toLowerCase() !== RESERVED_NAME;
}
