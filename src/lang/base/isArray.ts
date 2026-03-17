/**
 * Checks if the provided value is an `Array`.
 *
 * @template T - The type of elements within the array.
 * @param   value - The value to check.
 * @returns `true` if the value is an `Array`; otherwise, `false`.
 * @see     {@link nonArray}
 * @since   1.4.0
 * @version 1.0.0
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
