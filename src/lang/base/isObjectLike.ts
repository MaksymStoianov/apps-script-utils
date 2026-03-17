import { isFunction } from "./isFunction";
import { nonNil } from "./nonNil";

/**
 * Checks if `value` is an object in a broader sense.
 *
 * @param   value - The value to check.
 * @returns `true` if `value` is an `Object`, else `false`.
 * @see     {@link isObject}
 * @since   1.0.0
 * @version 1.1.0
 */
export function isObjectLike(value: unknown): value is object {
  return nonNil(value) && (typeof value === "object" || isFunction(value));
}
