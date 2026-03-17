/**
 * Checks if the provided value is `null`.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is `null`; otherwise, `false`.
 * @see     {@link nonNull}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
