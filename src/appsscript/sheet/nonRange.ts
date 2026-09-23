import { isRange } from "./isRange";

/**
 * Checks if the provided value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 *
 * @example
 * ```javascript
 * const range = SpreadsheetApp.getActiveRange();
 *
 * nonRange({}); // => true
 * nonRange(null); // => true
 * nonRange(range); // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a> object.
 * @see         {@link isRange}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         [nonRange on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonrange.html)
 * @since       1.3.0
 * @version     1.0.0
 * @environment Google Apps Script
 */
export function nonRange<T>(value: T | GoogleAppsScript.Spreadsheet.Range): value is T {
  return !isRange(value);
}
