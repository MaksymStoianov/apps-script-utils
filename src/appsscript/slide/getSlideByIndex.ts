import { isPresentation } from "./isPresentation";

/**
 * Gets a slide by its index in the presentation.
 *
 * @param {GoogleAppsScript.Slides.Presentation} presentation The presentation object.
 * @param {number} index The zero-based index of the slide.
 * @returns {GoogleAppsScript.Slides.Slide | null} The slide at the given index, or `null` if the index is out of bounds.
 * @since 1.5.0
 */
export function getSlideByIndex(
  presentation: GoogleAppsScript.Slides.Presentation,
  index: number
): GoogleAppsScript.Slides.Slide | null {
  if (!isPresentation(presentation)) {
    return null;
  }

  const slides = presentation.getSlides();

  if (index < 0 || index >= slides.length) {
    return null;
  }

  return slides[index];
}
