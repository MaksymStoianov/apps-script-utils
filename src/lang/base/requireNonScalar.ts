import { IllegalArgumentException } from "../../exception";
import { isScalar } from "./isScalar";

/**
 * Ensures that the provided value is NOT a scalar, throwing an exception otherwise.
 *
 * Scalar means a primitive carrying a single value: `string`, `number`,
 * `boolean`, `symbol` or `bigint`. `null` and `undefined` are not scalars, so
 * they pass this check.
 *
 * @example
 * ```javascript
 * requireNonScalar({ a: 1 });   // => { a: 1 }
 * requireNonScalar([1, 2]);     // => [1, 2]
 * requireNonScalar("abc");      // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the scalar cases are excluded.
 * @param    {T | string | number | boolean | symbol | bigint} value - The value to validate as a non-scalar.
 * @param    {string} [message="Expected a non-scalar value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a scalar.
 * @see      {@link isScalar}
 * @see      {@link nonScalar}
 * @see      {@link requireScalar}
 * @see      [requireNonScalar on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonScalar.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonScalar<T>(
  value: T | string | number | boolean | symbol | bigint,
  message: string = "Expected a non-scalar value."
): T {
  if (isScalar(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
