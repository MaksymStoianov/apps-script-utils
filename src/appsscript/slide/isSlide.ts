/**
 * Checks if a value is a {@link GoogleAppsScript.Slides.Slide|Slide} object.
 *
 * @param {unknown} value The value to check.
 * @returns {value is GoogleAppsScript.Slides.Slide} `true` if the value is a {@link GoogleAppsScript.Slides.Slide|Slide} object, `false` otherwise.
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
