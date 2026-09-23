import { isPresentation } from "./isPresentation";
import { isSlide } from "./isSlide";

/**
 * Gets the index of a slide in its presentation, taking the presentation first.
 *
 * @example
 * ```javascript
 * const presentation = SlidesApp.getActivePresentation();
 * const slide = presentation.getSlides()[2];
 *
 * getSlideIndex(presentation, slide); // => 2
 * ```
 *
 * @param {GoogleAppsScript.Slides.Presentation} presentation The presentation object.
 * @param {GoogleAppsScript.Slides.Slide} slide The slide object.
 * @returns {number | null} The zero-based index of the slide, or `null` if the slide is not found in the presentation.
 * @see {@link getSlideByIndex}
 * @since 1.5.0
 * @version 2.0.0
 */
export function getSlideIndex(
  presentation: GoogleAppsScript.Slides.Presentation,
  slide: GoogleAppsScript.Slides.Slide
): number | null {
  if (!isPresentation(presentation) || !isSlide(slide)) {
    return null;
  }

  const slideId = slide.getObjectId();

  const slides = presentation.getSlides();

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getObjectId() === slideId) {
      return i;
    }
  }

  return null;
}
