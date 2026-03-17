import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when a {@link GoogleAppsScript.Slides.Slide|Slide} object is not found.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Slides.Slide|Slide}
 * @see     [Class Slide](https://developers.google.com/apps-script/reference/slides/slide)
 * @since   1.5.0
 * @version 1.0.0
 */
export class SlideNotFoundException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Slide not found.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
