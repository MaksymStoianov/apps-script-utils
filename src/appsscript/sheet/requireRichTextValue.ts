import { IllegalArgumentException } from "../../exception";
import { isRichTextValue } from "./isRichTextValue";

/**
 * Ensures that the provided value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object,
 * throwing an exception otherwise.
 *
 * The guard to place in front of {@link convertRichTextToHtml}, which assumes
 * its input without checking it.
 *
 * @example
 * ```javascript
 * const value = SpreadsheetApp.newRichTextValue().setText("a").build();
 *
 * requireRichTextValue(value); // => value
 * requireRichTextValue({}); // throws IllegalArgumentException
 * requireRichTextValue(null); // throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a RichTextValue object."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.Spreadsheet.RichTextValue} The validated <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object.
 * @throws      {@link IllegalArgumentException} If the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object.
 * @see         {@link isRichTextValue}
 * @see         {@link nonRichTextValue}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a>
 * @see         [requireRichTextValue on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireRichTextValue.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireRichTextValue(
  value: unknown,
  message: string = "Expected a RichTextValue object."
): GoogleAppsScript.Spreadsheet.RichTextValue {
  if (!isRichTextValue(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
