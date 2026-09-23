import { isRichTextValue } from "./isRichTextValue";

/**
 * Checks if the provided value is NOT a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object.
 *
 * @example
 * ```javascript
 * const value = SpreadsheetApp.newRichTextValue().setText("a").build();
 *
 * nonRichTextValue({}); // => true
 * nonRichTextValue(null); // => true
 * nonRichTextValue(value); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.Spreadsheet.RichTextValue} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object; otherwise, `false`.
 * @see         {@link isRichTextValue}
 * @see         {@link requireRichTextValue}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a>
 * @see         [nonRichTextValue on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonrichtextvalue.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonRichTextValue<T>(
  value: T | GoogleAppsScript.Spreadsheet.RichTextValue
): value is T {
  return !isRichTextValue(value);
}
