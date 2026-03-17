import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * Checks if the provided value is `null` or `undefined` (i.e., "nil").
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is `null` or `undefined`; otherwise, `false`.
 * @see     {@link nonNil}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || isNull(value);
}
