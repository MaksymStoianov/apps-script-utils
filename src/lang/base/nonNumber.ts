import { isNumber } from "./isNumber";

/**
 * Checks if the provided value is NOT `number`.
 *
 * @template T
 * @param   {T | number} value - The value to check.
 * @returns {boolean} `true` if the value is not `number`; otherwise, `false`.
 * @see     {@link isNumber}
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonNumber<T>(value: T | number): value is T {
  return !isNumber(value);
}
