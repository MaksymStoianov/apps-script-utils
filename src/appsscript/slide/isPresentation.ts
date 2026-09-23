/**
 * Checks if a value is a {@link GoogleAppsScript.Slides.Presentation|Presentation} object.
 *
 * @example
 * ```javascript
 * const presentation = SlidesApp.getActivePresentation();
 *
 * isPresentation(presentation); // => true
 * isPresentation({}); // => false
 * isPresentation(null); // => false
 * ```
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Slides.Presentation} `true` if the value is a {@link GoogleAppsScript.Slides.Presentation|Presentation} object, `false` otherwise.
 * @see [isPresentation on the documentation site](https://maksymstoianov.github.io/apps-script-utils/ispresentation.html)
 * @see [Class Presentation](https://developers.google.com/apps-script/reference/slides/presentation)
 * @since 1.5.0
 */
export function isPresentation(value: unknown): value is GoogleAppsScript.Slides.Presentation {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as GoogleAppsScript.Slides.Presentation).getId === "function" &&
    typeof (value as GoogleAppsScript.Slides.Presentation).getSlides === "function"
  );
}
