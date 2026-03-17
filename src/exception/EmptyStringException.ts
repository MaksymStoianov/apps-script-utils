import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a string is expected but is `null`, `undefined`, or empty.
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
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
