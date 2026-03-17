import { isScalar } from "./isScalar";

/**
 * Checks if the provided value is NOT `Scalar`.
 *
 * @template T
 * @param   {T | string | number | boolean | symbol | bigint} value - The value to check.
 * @returns {boolean} `true` if the value is not `Scalar`; otherwise, `false`.
 * @see     {@link isScalar}
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonScalar<T>(value: T | string | number | boolean | symbol | bigint): value is T {
  return !isScalar(value);
}
