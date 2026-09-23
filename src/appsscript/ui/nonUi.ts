import { isUi } from "./isUi";

/**
 * Checks if the provided value is NOT a <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object.
 *
 * @example
 * ```javascript
 * const ui = SpreadsheetApp.getUi();
 *
 * nonUi({}); // => true
 * nonUi(null); // => true
 * nonUi(ui); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.Base.Ui} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a> object; otherwise, `false`.
 * @see         {@link isUi}
 * @see         {@link requireUi}
 * @see         <a href="https://developers.google.com/apps-script/reference/base/ui"><code>Ui</code></a>
 * @see         [nonUi on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonui.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonUi<T>(value: T | GoogleAppsScript.Base.Ui): value is T {
  return !isUi(value);
}
