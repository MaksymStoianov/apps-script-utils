import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Slides.Presentation|Presentation} object is provided.
 *
 * @example
 * ```javascript
 * throw new InvalidPresentationException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof InvalidPresentationException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Slides.Presentation|Presentation}
 * @see     [Class Presentation](https://developers.google.com/apps-script/reference/slides/presentation)
 * @see     [InvalidPresentationException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/invalidpresentationexception.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidPresentationException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid Presentation object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
