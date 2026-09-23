import { IllegalArgumentException } from "../../exception";
import { isHtmlOutput } from "./isHtmlOutput";

type HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;

/**
 * Ensures that the provided value is an <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object,
 * throwing an exception otherwise.
 *
 * Identification is structural: the value must carry `getContent`,
 * `setTitle` and `setXFrameOptionsMode` as callable members.
 *
 * @example
 * ```javascript
 * const output = HtmlService.createHtmlOutput("<p>hi</p>");
 *
 * requireHtmlOutput(output); // => output
 * requireHtmlOutput({}); // throws IllegalArgumentException
 * requireHtmlOutput(null); // throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected an HtmlOutput object."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.HTML.HtmlOutput} The validated <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object.
 * @throws      {@link IllegalArgumentException} If the value is not an <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a> object.
 * @see         {@link isHtmlOutput}
 * @see         {@link nonHtmlOutput}
 * @see         <a href="https://developers.google.com/apps-script/reference/html/html-output"><code>HtmlOutput</code></a>
 * @see         [requireHtmlOutput on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireHtmlOutput.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireHtmlOutput(
  value: unknown,
  message: string = "Expected an HtmlOutput object."
): HtmlOutput {
  if (!isHtmlOutput(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
