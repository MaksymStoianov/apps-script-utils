import { RuntimeException } from "./RuntimeException";

/**
 * An exception thrown when a function expects a string, but receives a value of a different type.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @since   1.0.0
 * @version 1.0.0
 */
export class InvalidStringException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid string provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
