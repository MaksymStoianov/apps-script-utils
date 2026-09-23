import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a string is expected to be an email address
 * but does not conform to a valid email format.
 *
 * @example
 * ```javascript
 * throw new InvalidEmailFormatException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof InvalidEmailFormatException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [InvalidEmailFormatException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/InvalidEmailFormatException.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export class InvalidEmailFormatException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid email format.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
