import { isObject } from "../../lang";

/**
 * ## isUi
 *
 * Checks if the given value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object.
 *
 * @param       value - The value to check.
 * @returns     `true` if the value is an <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object, `false` otherwise.
 * @see         <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a>
 * @since       1.0.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function isUi(value: unknown): value is GoogleAppsScript.Base.Ui {
  return isObject(value) && value?.toString() === "Ui";
}
