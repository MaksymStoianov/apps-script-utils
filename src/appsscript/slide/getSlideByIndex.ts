import { isPresentation } from "./isPresentation";

/**
 * Gets a slide by its index, in a presentation or in the active one.
 *
 * @example
 * ```javascript
 * const first = getSlideByIndex(0);
 *
 * // Or in a presentation the script opened itself:
 * const presentation = SlidesApp.openById(id);
 *
 * const third = getSlideByIndex(2, presentation);
 * ```
 *
 * @param {number} index The zero-based index of the slide.
 * @param {GoogleAppsScript.Slides.Presentation} [presentation] The presentation to look in. Defaults to the active one.
 * @returns {GoogleAppsScript.Slides.Slide | null} The slide at the given index, or `null` if there is none there.
 * @see {@link getSlideIndex}
 * @see [getSlideByIndex on the documentation site](https://maksymstoianov.github.io/apps-script-utils/getslidebyindex.html)
 * @see [Class Presentation](https://developers.google.com/apps-script/reference/slides/presentation)
 * @see [Class Slide](https://developers.google.com/apps-script/reference/slides/slide)
 * @since 1.5.0
 * @version 2.0.0
 */
export function getSlideByIndex(
  index: number,
  presentation?: GoogleAppsScript.Slides.Presentation | null
): GoogleAppsScript.Slides.Slide | null {
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

  const slides = target.getSlides();

  if (index < 0 || index >= slides.length) {
    return null;
  }

  return slides[index];
}
