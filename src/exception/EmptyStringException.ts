import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a string is expected but is `null`, `undefined`, or empty.
 *
 * @example
 * ```javascript
 * throw new EmptyStringException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof EmptyStringException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [EmptyStringException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/emptystringexception.html)
 * @since   1.0.0
 * @version 1.0.0
 */
export class EmptyStringException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "String is null, undefined, or empty.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
