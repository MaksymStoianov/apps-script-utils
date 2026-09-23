import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when a {@link GoogleAppsScript.Slides.Slide|Slide} object is not found.
 *
 * @example
 * ```javascript
 * throw new SlideNotFoundException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof SlideNotFoundException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GoogleAppsScript.Slides.Slide|Slide}
 * @see     [Class Slide](https://developers.google.com/apps-script/reference/slides/slide)
 * @see     [SlideNotFoundException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/SlideNotFoundException.html)
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
