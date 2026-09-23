import { isPresentation } from "./isPresentation";
import { isSlide } from "./isSlide";

/**
 * Gets the position of a slide, in a presentation or in the active one.
 *
 * @example
 * ```javascript
 * const slide = SlidesApp.getActivePresentation().getSlides()[2];
 *
 * getSlideIndex(slide); // => 2
 * ```
 *
 * @param {GoogleAppsScript.Slides.Slide} slide The slide to look for.
 * @param {GoogleAppsScript.Slides.Presentation} [presentation] The presentation to look in. Defaults to the active one.
 * @returns {number | null} The zero-based index of the slide, or `null` if the presentation does not hold it.
 * @see {@link getSlideByIndex}
 * @see [getSlideIndex on the documentation site](https://maksymstoianov.github.io/apps-script-utils/getslideindex.html)
 * @see [Class Presentation](https://developers.google.com/apps-script/reference/slides/presentation)
 * @see [Class Slide](https://developers.google.com/apps-script/reference/slides/slide)
 * @since 1.5.0
 * @version 2.0.0
 */
export function getSlideIndex(
  slide: GoogleAppsScript.Slides.Slide,
  presentation?: GoogleAppsScript.Slides.Presentation | null
): number | null {
  if (!isSlide(slide)) {
    return null;
  }

  // A script bound to a presentation has one without being told; a standalone
  // one has none, and asking for it there is an error rather than an answer.
  const target =
    presentation ??
    (() => {
      try {
        return SlidesApp.getActivePresentation();
      } catch {
        return null;
      }
    })();

  if (!isPresentation(target)) {
    return null;
  }

  const slideId = slide.getObjectId();

  const slides = target.getSlides();

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getObjectId() === slideId) {
      return i;
    }
  }

  return null;
}
