import { isTextStyle } from "./isTextStyle";

/**
 * Checks if the provided value is NOT a <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object.
 *
 * @example
 * ```javascript
 * const style = SpreadsheetApp.newTextStyle().setBold(true).build();
 *
 * nonTextStyle({}); // => true
 * nonTextStyle(null); // => true
 * nonTextStyle(style); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.Spreadsheet.TextStyle} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object; otherwise, `false`.
 * @see         {@link isTextStyle}
 * @see         {@link requireTextStyle}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a>
 * @see         [nonTextStyle on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonTextStyle.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonTextStyle<T>(value: T | GoogleAppsScript.Spreadsheet.TextStyle): value is T {
  return !isTextStyle(value);
}
