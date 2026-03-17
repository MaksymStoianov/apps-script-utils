import { InvalidRangeException } from "../../exception";
import { isRange } from "./isRange";

/**
 * Ensures that the provided value is a valid <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object, throwing an exception otherwise.
 *
 * @param   {unknown} value - The value to validate as a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 * @param   {string} [message] - Optional custom error message if the validation fails.
 * @returns {GoogleAppsScript.Spreadsheet.Range} The validated <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 * @throws  <a href="../../exception/appsscript/sheet/InvalidRangeException.ts"><code>InvalidRangeException</code></a>
 * @see     {@link isRange}
 * @see     {@link nonRange}
 * @see     <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @since   1.5.0
 * @version 1.0.0
 */
export function requireRange(
  value: unknown,
  message?: string
): GoogleAppsScript.Spreadsheet.Range {
  if (!isRange(value)) {
    throw new InvalidRangeException(message);
  }

  return value;
}
