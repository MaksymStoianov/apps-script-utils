import { Exception } from "./Exception";

/**
 * ## RuntimeException
 *
 * Represents an exception that may be thrown during normal operation.
 *
 * @extends {@link Exception}
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
