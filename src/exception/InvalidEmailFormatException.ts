import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a string is expected to be an email address
 * but does not conform to a valid email format.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
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
