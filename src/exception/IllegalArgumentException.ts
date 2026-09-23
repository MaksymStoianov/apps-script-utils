import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a method has been passed an illegal or inappropriate argument.
 *
 * @example
 * ```javascript
 * throw new IllegalArgumentException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof IllegalArgumentException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [IllegalArgumentException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/IllegalArgumentException.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export class IllegalArgumentException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid argument");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
