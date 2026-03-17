import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GoogleAppsScript.Slides.Presentation|Presentation} object is provided.
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Slides.Presentation|Presentation}
 * @see     [Class Presentation](https://developers.google.com/apps-script/reference/slides/presentation)
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
