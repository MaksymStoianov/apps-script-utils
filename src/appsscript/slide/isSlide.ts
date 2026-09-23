/**
 * Checks if a value is a {@link GoogleAppsScript.Slides.Slide|Slide} object.
 *
 * @example
 * ```javascript
 * const slide = SlidesApp.getActivePresentation().getSlides()[0];
 *
 * isSlide(slide); // => true
 * isSlide({}); // => false
 * isSlide(null); // => false
 * ```
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Slides.Slide} `true` if the value is a {@link GoogleAppsScript.Slides.Slide|Slide} object, `false` otherwise.
 * @see [isSlide on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isSlide.html)
 * @see [Class Slide](https://developers.google.com/apps-script/reference/slides/slide)
 * @since 1.5.0
 */
export function isSlide(value: unknown): value is GoogleAppsScript.Slides.Slide {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as GoogleAppsScript.Slides.Slide).getObjectId === "function" &&
    typeof (value as GoogleAppsScript.Slides.Slide).getPageElementById === "function"
  );
}
