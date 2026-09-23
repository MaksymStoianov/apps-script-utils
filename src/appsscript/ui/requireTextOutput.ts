import { IllegalArgumentException } from "../../exception";
import { isTextOutput } from "./isTextOutput";

type TextOutput = GoogleAppsScript.Content.TextOutput;

/**
 * Ensures that the provided value is a <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object,
 * throwing an exception otherwise.
 *
 * Identification is structural: the value must carry `getMimeType` and
 * `getContent` as callable members.
 *
 * @example
 * ```javascript
 * const output = ContentService.createTextOutput("hi");
 *
 * requireTextOutput(output); // => output
 * requireTextOutput({}); // throws IllegalArgumentException
 * requireTextOutput(null); // throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a TextOutput object."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.Content.TextOutput} The validated <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object.
 * @throws      {@link IllegalArgumentException} If the value is not a <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object.
 * @see         {@link isTextOutput}
 * @see         {@link nonTextOutput}
 * @see         <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireTextOutput(
  value: unknown,
  message: string = "Expected a TextOutput object."
): TextOutput {
  if (!isTextOutput(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
