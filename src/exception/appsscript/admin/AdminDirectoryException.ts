import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.
 *
 * @example
 * ```javascript
 * throw new AdminDirectoryException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof AdminDirectoryException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [AdminDirectoryException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/admindirectoryexception.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export class AdminDirectoryException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Admin SDK Directory Service is not available or not enabled.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
