import { IllegalArgumentException } from "../../exception";
import { isScalar } from "./isScalar";

/**
 * Ensures that the provided value is a scalar, throwing an exception otherwise.
 *
 * Scalar here means a primitive that carries a single value: `string`,
 * `number`, `boolean`, `symbol` or `bigint`. `null` and `undefined` are not
 * scalars, since they carry the absence of one.
 *
 * @example
 * ```javascript
 * requireScalar("abc");   // => "abc"
 * requireScalar(0);       // => 0
 * requireScalar([1]);     // Throws IllegalArgumentException
 * requireScalar(null);    // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a scalar.
 * @param   {string} [message="Expected a scalar value."] - Optional custom error message if the validation fails.
 * @returns {string | number | boolean | symbol | bigint} The validated scalar value.
 * @throws  {@link IllegalArgumentException} If the value is not a scalar.
 * @see     {@link isScalar}
 * @see     {@link nonScalar}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireScalar(
  value: unknown,
  message: string = "Expected a scalar value."
): string | number | boolean | symbol | bigint {
  if (!isScalar(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
