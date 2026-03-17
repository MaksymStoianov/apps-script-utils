/**
 * Checks if the provided value is a scalar type (`string`, `number`, `boolean`, or `symbol`).
 *
 * @param   value - The value to check.
 * @returns `true` if the value is a scalar type; otherwise, `false`.
 * @see     {@link nonScalar}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isScalar(
  value: unknown
): value is string | number | boolean | symbol | bigint {
  return /string|number|boolean|symbol|bigint/.test(typeof value);
}
