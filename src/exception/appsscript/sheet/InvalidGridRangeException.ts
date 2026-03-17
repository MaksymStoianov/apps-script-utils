import { RuntimeException } from "../../RuntimeException";

/**
 * Represents an exception thrown when an invalid {@link GridRange} object is provided.
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     {@link GridRange}
 * @since   1.5.0
 * @version 1.0.0
 */
export class InvalidGridRangeException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Invalid GridRange object provided.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
