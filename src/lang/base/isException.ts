import { Exception } from "../../exception";
import { isObject } from "./isObject";

/**
 * ## isException
 *
 * Checks if the provided value is an instance of {@link Exception} or a class that extends it.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is an instance of {@link Exception} (or a subclass); otherwise, `false`.
 * @see     {@link Exception}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isException(value: unknown): value is Exception {
  return isObject(value) && value instanceof Exception;
}
