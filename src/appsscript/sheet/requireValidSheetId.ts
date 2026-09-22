import { IllegalArgumentException } from "../../exception";
import { isValidSheetId } from "./isValidSheetId";

/**
 * Ensures that the provided value is a valid sheet identifier,
 * throwing an exception otherwise.
 *
 * `0` is a valid sheet id — the first sheet of every spreadsheet carries it —
 * so this must not be replaced by a truthiness check. Fractions, `Infinity`
 * and values past the safe integer range are rejected.
 *
 * The check is on shape, not existence: a value that passes may still refer to
 * no sheet in the target spreadsheet.
 *
 * @example
 * ```javascript
 * requireValidSheetId(0);     // => 0
 * requireValidSheetId(-1);    // Throws IllegalArgumentException
 * requireValidSheetId("0");   // Throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a valid sheet id."] - Optional custom error message if the validation fails.
 * @returns     {number} The validated sheet identifier.
 * @throws      {@link IllegalArgumentException} If the value is not a valid sheet identifier.
 * @see         {@link isValidSheetId}
 * @see         {@link nonValidSheetId}
 * @see         {@link getSheetById}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireValidSheetId(
  value: unknown,
  message: string = "Expected a valid sheet id."
): number {
  if (!isValidSheetId(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
