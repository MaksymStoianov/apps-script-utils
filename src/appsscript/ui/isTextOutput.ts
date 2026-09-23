import { isFunction, isObject } from "../../lang";

type TextOutput = GoogleAppsScript.Content.TextOutput;

/**
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object.
 *
 * @example
 * ```javascript
 * const output = ContentService.createTextOutput("hi");
 *
 * isTextOutput(output); // => true
 * isTextOutput({}); // => false
 * isTextOutput(null); // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is an <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object, `false` otherwise.
 * @see         <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a>
 * @see         [isTextOutput on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isTextOutput.html)
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function isTextOutput(value: unknown): value is TextOutput {
  return (
    isObject(value) &&
    isFunction((value as TextOutput)?.getMimeType) &&
    isFunction((value as TextOutput)?.getContent)
  );
}
