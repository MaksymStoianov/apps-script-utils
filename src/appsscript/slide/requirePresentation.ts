import { InvalidPresentationException } from "../../exception";
import { isPresentation } from "./isPresentation";

/**
 * Ensures that the provided value is a Google Apps Script <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a> object,
 * throwing an exception otherwise.
 *
 * @example
 * ```javascript
 * const presentation = SlidesApp.getActivePresentation();
 *
 * requirePresentation(presentation); // => presentation
 * requirePresentation({}); // throws InvalidPresentationException
 * requirePresentation(null); // throws InvalidPresentationException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Required Presentation object is missing or invalid."] - Optional custom error message if the validation fails.
 * @returns     {GoogleAppsScript.Slides.Presentation} The validated <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a> object.
 * @throws      {@link InvalidPresentationException} If the value is not a <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a> object.
 * @see         {@link isPresentation}
 * @see         {@link nonPresentation}
 * @see         {@link requireSlide}
 * @see         <a href="https://developers.google.com/apps-script/reference/slides/presentation"><code>Presentation</code></a>
 * @see         [requirePresentation on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirepresentation.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`
 */
export function requirePresentation(
  value: unknown,
  message: string = "Required Presentation object is missing or invalid."
): GoogleAppsScript.Slides.Presentation {
  if (!isPresentation(value)) {
    throw new InvalidPresentationException(message);
  }

  return value;
}
