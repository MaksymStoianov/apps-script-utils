import { isNumber } from "../base";

/**
 * Checks if a value is a number and an integer.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is an integer, otherwise `false`.
 * @see     {@link isNumber}
 * @since   1.5.0
 * @version 1.0.0
 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}
