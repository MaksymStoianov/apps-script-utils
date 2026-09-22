/**
 * Checks if the provided value is a scalar type (`string`, `number`, `boolean`, `symbol`, or `bigint`).
 *
 * A scalar is a primitive carrying a single value. `null` and `undefined` are
 * not scalars: they carry the absence of one.
 *
 * @example
 * ```javascript
 * isScalar("abc");   // => true
 * isScalar(0);       // => true
 * isScalar(1n);      // => true
 * isScalar(null);    // => false
 * isScalar([1]);     // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a scalar type; otherwise, `false`.
 * @see     {@link nonScalar}
 * @see     {@link requireScalar}
 * @since   1.0.0
 * @version 1.0.1
 */
export function isScalar(value: unknown): value is string | number | boolean | symbol | bigint {
  return /string|number|boolean|symbol|bigint/.test(typeof value);
}
