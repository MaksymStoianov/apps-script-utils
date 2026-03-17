import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a method has been passed an illegal or inappropriate argument.
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
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
