import { nonNil } from "./nonNil";

/**
 * ## isObject
 *
 * Checks if `value` is the of `Object`.
 *
 * @param   value - The value to check.
 * @returns `true` if `value` is an `Object`, else `false`.
 * @see     {@link isObjectLike}
 * @since   1.0.0
 * @version 1.1.0
 */
export function isObject(value: unknown): value is object {
  return nonNil(value) && typeof value === "object";
}
