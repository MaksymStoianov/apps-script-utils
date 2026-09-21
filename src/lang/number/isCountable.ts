import { isNonNegative } from "./isNonNegative";

/**
 * Checks if a value is a countable number — a non-negative safe integer.
 *
 * "Countable" means a value that can serve as a quantity, a length, or a
 * zero-based index: a whole number, not negative, and small enough that
 * integer arithmetic on it is still exact.
 *
 * @example
 * ```javascript
 * isCountable(0);                          // => true
 * isCountable(42);                         // => true
 * isCountable(-1);                         // => false
 * isCountable(1.5);                        // => false
 * isCountable(Number.MAX_SAFE_INTEGER + 2) // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a non-negative safe integer; otherwise, `false`.
 * @see     {@link isNonNegative}
 * @see     {@link isSafeInteger}
 * @since   1.5.0
 * @version 1.1.0
 */
export function isCountable(value: unknown): value is number {
  return isNonNegative(value) && Number.isSafeInteger(value);
}
