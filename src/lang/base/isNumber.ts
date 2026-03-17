/**
 * Checks if the provided value is a number.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a number; otherwise, `false`.
 * @see     {@link nonNumber}
 * @see     {@link isNumberLike}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
