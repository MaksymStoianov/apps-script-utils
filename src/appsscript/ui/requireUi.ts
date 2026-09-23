import { IllegalArgumentException } from "../../exception";
import { isUi } from "./isUi";

/**
 * Ensures that the provided value is a <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object,
 * throwing an exception otherwise.
 *
 * `SpreadsheetApp.getUi()` itself throws when there is no user interface to
 * attach to — inside a trigger, a web app, or an execution started from the
 * API. Validating the result here produces a message that says which of those
 * happened, instead of the runtime's generic failure.
 *
 * @example
 * ```javascript
 * const ui = SpreadsheetApp.getUi();
 *
 * requireUi(ui); // => ui
 * requireUi({}); // throws IllegalArgumentException
 * requireUi(null); // throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a Ui object."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.Base.Ui} The validated <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object.
 * @throws      {@link IllegalArgumentException} If the value is not a <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object.
 * @see         {@link isUi}
 * @see         {@link nonUi}
 * @see         <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requireUi(
  value: unknown,
  message: string = "Expected a Ui object."
): GoogleAppsScript.Base.Ui {
  if (!isUi(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
