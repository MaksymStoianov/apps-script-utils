import { Exception } from "./Exception";

/**
 * Represents an exception that may be thrown during normal operation.
 *
 * @example
 * ```javascript
 * throw new RuntimeException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof RuntimeException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends Exception
 * @see     {@link Error}
 * @since   1.0.0
 * @version 1.0.0
 */
export class RuntimeException extends Exception {
  constructor(message?: string | undefined) {
    super(message ?? "A runtime error occurred.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
