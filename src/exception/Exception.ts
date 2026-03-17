import { isObject, isString } from "../lang";

/**
 * Base exception class.
 *
 * @extends {@link Error}
 * @since   1.0.0
 * @version 1.0.0
 */
export class Exception extends Error {
  /**
   * @param [message] - The error message, an existing Error object, or any other value.
   */
  constructor(message?: unknown) {
    super(
      message instanceof Error
        ? message.message
        : isString(message)
          ? message
          : undefined
    );

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Provides a custom string tag for `Object.prototype.toString.call()`.
   *
   * @returns The name of the constructor.
   */
  get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  /**
   * Creates a new Exception instance.
   *
   * @param   [message] - The error message or an existing Error object.
   * @returns A new instance of the Exception class.
   */
  static create(message?: unknown): Exception {
    return new Exception(message);
  }

  /**
   * Type guard to check if a given value is an instance of {@link Exception} or any of its subclasses.
   *
   * @param   value - The value to check.
   * @returns `true` if the value is an instance of `Exception` or a class that extends it; otherwise, `false`.
   */
  static isException(value: unknown): value is Exception {
    return isObject(value) && value instanceof Exception;
  }

  /**
   * Retrieves the error message of the exception.
   *
   * @returns The message string associated with the exception.
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * Returns a string representation of the exception.
   *
   * @returns A string representing the exception.
   */
  toString(): string {
    return String(this.message ?? this.constructor.name);
  }
}
