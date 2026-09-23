import { RuntimeException } from "./RuntimeException";

/**
 * Represents an exception thrown when a repository is not defined.
 *
 * @example
 * ```javascript
 * throw new RepositoryIsNotDefinedException("something specific about this call");
 *
 * try {
 *   doWork();
 * } catch (error) {
 *   if (error instanceof RepositoryIsNotDefinedException) {
 *     // handled
 *   }
 * }
 * ```
 *
 * @extends RuntimeException
 * @see     {@link Exception}
 * @see     {@link Error}
 * @see     [RepositoryIsNotDefinedException on the documentation site](https://maksymstoianov.github.io/apps-script-utils/RepositoryIsNotDefinedException.html)
 * @since   1.5.0
 * @version 1.0.0
 */
export class RepositoryIsNotDefinedException extends RuntimeException {
  constructor(message?: string | undefined) {
    super(message || "Repository is not defined.");

    const target = new.target;

    this.name = target.name;

    Object.setPrototypeOf(this, target.prototype);
  }
}
