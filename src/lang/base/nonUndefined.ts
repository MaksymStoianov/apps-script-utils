import { isUndefined } from "./isUndefined";

/**
 * Checks if the provided value is NOT `undefined`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `undefined`; otherwise, `false`.
 * @see     {@link isUndefined}
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonUndefined<T>(value: T | undefined): value is T {
  return !isUndefined(value);
}
