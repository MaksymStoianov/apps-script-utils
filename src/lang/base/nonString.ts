import { isString } from "./isString";

/**
 * Checks if the provided value is NOT `string`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `string`; otherwise, `false`.
 * @see     {@link isString}
 * @see     {@link requireString}
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonString<T>(value: T | string): value is T {
  return !isString(value);
}
