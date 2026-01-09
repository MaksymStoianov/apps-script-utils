import { isFunction, isObject } from "../../lang";

type HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;

/**
 * ## isHtmlOutput
 *
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object.
 *
 * @param       value - The value to check.
 * @returns     `true` if the value is an <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object, `false` otherwise.
 * @see         <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a>
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function isHtmlOutput(value: unknown): value is HtmlOutput {
  return (
    isObject(value) &&
    isFunction((value as HtmlOutput)?.getContent) &&
    isFunction((value as HtmlOutput)?.setTitle) &&
    isFunction((value as HtmlOutput)?.setXFrameOptionsMode)
  );
}
