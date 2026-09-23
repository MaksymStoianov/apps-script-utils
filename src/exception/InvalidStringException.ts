import { RuntimeException } from "./RuntimeException";

/**
 * An exception thrown when a function expects a string, but receives a value of a different type.
 *
 * @example
 * ```javascript
 * throw new InvalidStringException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof InvalidStringException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [InvalidStringException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/InvalidStringException.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export class InvalidStringException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid string provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
