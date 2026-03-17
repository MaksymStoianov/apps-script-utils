import { RuntimeException } from "../RuntimeException";

/**
 * Represents an exception thrown during authentication failures.
 *
 * @extends {@link RuntimeException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @since   1.5.0
 * @version 1.0.0
 */
export class AuthenticationException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Authentication failed.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
