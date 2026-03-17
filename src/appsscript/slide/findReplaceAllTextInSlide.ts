import { isSlide } from "./isSlide";

/**
 * Finds and replaces all occurrences of text within a slide.
 *
 * @param {GoogleAppsScript.Slides.Slide} slide The slide object.
 * @param {string} findText The text to find.
 * @param {string} replaceText The text to replace with.
 * @param {boolean} [matchCase=true] Whether to match case.
 * @returns {number} The number of replacements made.
 * @since 1.5.0
 */
export function findReplaceAllTextInSlide(
  slide: GoogleAppsScript.Slides.Slide,
  findText: string,
  replaceText: string,
  matchCase: boolean = true
): number {
  if (!isSlide(slide)) {
    return 0;
  }

  return slide.replaceAllText(findText, replaceText, matchCase);
}
