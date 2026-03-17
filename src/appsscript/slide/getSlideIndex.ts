import { isPresentation } from "./isPresentation";
import { isSlide } from "./isSlide";

/**
 * Gets the index of a slide in its presentation.
 *
 * @param {GoogleAppsScript.Slides.Slide} slide The slide object.
 * @param {GoogleAppsScript.Slides.Presentation} presentation The presentation object.
 * @returns {number | null} The zero-based index of the slide, or `null` if the slide is not found in the presentation.
 * @since 1.5.0
 */
export function getSlideIndex(
  slide: GoogleAppsScript.Slides.Slide,
  presentation: GoogleAppsScript.Slides.Presentation
): number | null {
  if (!isSlide(slide) || !isPresentation(presentation)) {
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
