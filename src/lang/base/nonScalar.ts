import { isScalar } from "./isScalar";

/**
 * Checks if the provided value is NOT `Scalar`.
 *
 * @example
 * ```javascript
 * nonScalar({}); // => true
 * nonScalar([]); // => true
 * nonScalar(null); // => true
 * nonScalar("abc"); // => false
 * nonScalar(1); // => false
 * nonScalar(true); // => false
 * nonScalar(10n); // => false
 * ```
 *
 * @template T
 * @param   {T | string | number | boolean | symbol | bigint} value - The value to check.
 * @returns {boolean} `true` if the value is not `Scalar`; otherwise, `false`.
 * @see     {@link isScalar}
 * @see     [nonScalar on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonscalar.html)
 * @since   1.4.0
 * @version 1.0.0
 */
export function nonScalar<T>(value: T | string | number | boolean | symbol | bigint): value is T {
  return !isScalar(value);
}
