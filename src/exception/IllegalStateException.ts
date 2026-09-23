import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a method is invoked at an illegal or inappropriate time.
 *
 * The arguments may be perfectly valid; the object is simply not in a state that allows the call —
 * a stop without a start, a second start on something already running, a use before initialisation.
 *
 * @example
 * ```javascript
 * throw new IllegalStateException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof IllegalStateException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link IllegalArgumentException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [IllegalStateException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/IllegalStateException.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export class IllegalStateException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Illegal state");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
