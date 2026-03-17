import { isNil } from "./isNil";

/**
 * Checks if the provided value is neither `null` nor `undefined` (i.e., "not nil").
 *
 * @template T
 * @param   {T | null | undefined} value - The value to check.
 * @returns {boolean} `true` if the value is not `null` and not `undefined`; otherwise, `false`.
 * @see     {@link isNil}
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}
