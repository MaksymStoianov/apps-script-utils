import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GridRange} object is provided.
 *
 * @example
 * ```javascript
 * throw new InvalidGridRangeException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof InvalidGridRangeException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GridRange}
 * @see     [InvalidGridRangeException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/InvalidGridRangeException.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidGridRangeException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid GridRange object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
