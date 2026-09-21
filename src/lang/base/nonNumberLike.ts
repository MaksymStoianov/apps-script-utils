import { isNumberLike } from "./isNumberLike";

/**
 * Checks if the provided value is NOT a number in a broader sense.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not a number; otherwise, `false`.
 * @see     {@link isNumberLike}
 * @see     {@link nonNumber}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonNumberLike(value: unknown): boolean {
  return !isNumberLike(value);
}
