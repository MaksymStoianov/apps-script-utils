import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when an application attempts to use `null` or `undefined` in a context where an object is required.
 *
 * @example
 * ```javascript
 * throw new NullPointerException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof NullPointerException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [NullPointerException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/NullPointerException.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export class NullPointerException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Object is null or undefined.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
