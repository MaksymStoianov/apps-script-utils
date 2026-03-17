import { isArray } from "./isArray";

/**
 * Checks if the provided value is NOT `Array`.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not `Array`; otherwise, `false`.
 * @see     {@link isArray}
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonArray<T>(
  value: T | unknown
): value is Exclude<T | unknown, unknown[] | Array<unknown>> {
  return !isArray(value);
}
