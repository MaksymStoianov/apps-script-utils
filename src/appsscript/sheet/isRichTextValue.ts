import { isObject } from "../../lang";

/**
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is a <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a> object, `false` otherwise.
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value"><code>RichTextValue</code></a>
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function isRichTextValue(
  value: unknown
): value is GoogleAppsScript.Spreadsheet.RichTextValue {
  return isObject(value) && value?.toString() === "RichTextValue";
}
