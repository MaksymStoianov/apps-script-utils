import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when the current user is known but is not
 * permitted to perform the requested action.
 *
 * Distinct from {@link AuthenticationException}, which reports a failure to
 * establish who the caller is. The remedies differ: re-authenticating does not
 * grant a missing role.
 *
 * @extends RuntimeException
 * @see     {@link AuthenticationException}
 * @see     {@link Exception}
 * @see     {@link Error}
 * @since   1.11.0
 * @version 1.0.0
 */
export class AuthorizationException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "The current user is not authorized to perform this action.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
