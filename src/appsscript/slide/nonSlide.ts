import { isSlide } from "./isSlide";

/**
 * Checks if the given value is NOT a Google Apps Script <a href="https://developers.google.com/apps-script/reference/slides/slide"><code>Slide</code></a> object.
 *
 * @example
 * ```javascript
 * const slide = SlidesApp.getActivePresentation().getSlides()[0];
 *
 * nonSlide({}); // => true
 * nonSlide(null); // => true
 * nonSlide(slide); // => false
 * ```
 *
 * @template T
 * @param       {T | GoogleAppsScript.Slides.Slide} value - The value to check.
 * @returns     {boolean} `true` if the value is not a <a href="https://developers.google.com/apps-script/reference/slides/slide"><code>Slide</code></a> object; otherwise, `false`.
 * @see         {@link isSlide}
 * @see         {@link requireSlide}
 * @see         <a href="https://developers.google.com/apps-script/reference/slides/slide"><code>Slide</code></a>
 * @see         [nonSlide on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonslide.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function nonSlide<T>(value: T | GoogleAppsScript.Slides.Slide): value is T {
  return !isSlide(value);
}
