import { isHtmlOutput } from "./isHtmlOutput";

type HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;

/**
 * Checks if the provided value is NOT an <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object.
 *
 * @example
 * ```javascript
 * const output = HtmlService.createHtmlOutput("<p>hi</p>");
 *
 * nonHtmlOutput({}); // => true
 * nonHtmlOutput(null); // => true
 * nonHtmlOutput(output); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.HTML.HtmlOutput} value - The value to check.
 * @returns     {boolean} `true` if the value is not an <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object; otherwise, `false`.
 * @see         {@link isHtmlOutput}
 * @see         {@link requireHtmlOutput}
 * @see         <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonHtmlOutput<T>(value: T | HtmlOutput): value is T {
  return !isHtmlOutput(value);
}
