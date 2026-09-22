import { isPresentation } from "./isPresentation";

/**
 * Checks if the given value is NOT a Google Apps Script <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a> object.
 *
 * @example
 * ```javascript
 * const presentation = SlidesApp.getActivePresentation();
 *
 * nonPresentation({}); // => true
 * nonPresentation(null); // => true
 * nonPresentation(presentation); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.Slides.Presentation} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a> object; otherwise, `false`.
 * @see         {@link isPresentation}
 * @see         {@link requirePresentation}
 * @see         <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a>
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonPresentation<T>(value: T | GoogleAppsScript.Slides.Presentation): value is T {
  return !isPresentation(value);
}
