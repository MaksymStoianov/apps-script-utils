import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when the Admin SDK Directory Service is not available or enabled.
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
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
