import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when an application attempts to use `null` or `undefined` in a context where an object is required.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
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
