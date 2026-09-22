import { isTextOutput } from "./isTextOutput";

type TextOutput = GoogleAppsScript.Content.TextOutput;

/**
 * Checks if the provided value is NOT a <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object.
 *
 * @template T
 * @param       {T | GoogleAppsScript.Content.TextOutput} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a> object; otherwise, `false`.
 * @see         {@link isTextOutput}
 * @see         {@link requireTextOutput}
 * @see         <a href="https://developers.google.com/apps-script/reference/content/text-output"><code>TextOutput</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonTextOutput<T>(value: T | TextOutput): value is T {
  return !isTextOutput(value);
}
