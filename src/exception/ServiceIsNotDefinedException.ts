import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a service is not defined.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @since   1.5.0
 * @version 1.0.0
 */
export class ServiceIsNotDefinedException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Service is not defined.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
