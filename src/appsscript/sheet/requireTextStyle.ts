import { IllegalArgumentException } from "../../exception";
import { isTextStyle } from "./isTextStyle";

/**
 * Ensures that the provided value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object,
 * throwing an exception otherwise.
 *
 * A `TextStyleBuilder` does not qualify. `SpreadsheetApp.newTextStyle()`
 * returns the builder; only `.build()` produces the style.
 *
 * @example
 * ```javascript
 * const style = SpreadsheetApp.newTextStyle().setBold(true).build();
 *
 * requireTextStyle(style); // => style
 * requireTextStyle({}); // throws IllegalArgumentException
 * requireTextStyle(null); // throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a TextStyle object."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.Spreadsheet.TextStyle} The validated <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object.
 * @throws      {@link IllegalArgumentException} If the value is not a <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a> object.
 * @see         {@link isTextStyle}
 * @see         {@link nonTextStyle}
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style"><code>TextStyle</code></a>
 * @see         [requireTextStyle on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireTextStyle.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireTextStyle(
  value: unknown,
  message: string = "Expected a TextStyle object."
): GoogleAppsScript.Spreadsheet.TextStyle {
  if (!isTextStyle(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
