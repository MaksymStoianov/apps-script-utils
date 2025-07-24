import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * Checks if the provided value is `null` or `undefined` (i.e., "nil").
 *
 * @param   value - The value to check.
 * @returns `true` if the value is `null` or `undefined`; otherwise, `false`.
 * @since   0.1.0
 * @version 0.1.0
 */
export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || isNull(value);
}
