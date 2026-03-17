import { isNull } from "./isNull";

/**
 * Checks if the provided value is NOT `null`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `null`; otherwise, `false`.
 * @see     {@link isNull}
 * @see     {@link requireNonNull}
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonNull<T>(value: T | null): value is T {
  return !isNull(value);
}
