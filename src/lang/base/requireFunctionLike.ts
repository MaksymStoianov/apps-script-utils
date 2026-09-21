import { IllegalArgumentException } from "../../exception";
import { isFunctionLike } from "./isFunctionLike";

/**
 * Ensures that the provided value is a function in a broader sense,
 * throwing an exception otherwise.
 *
 * Accepts anything callable, including async generator functions and other
 * exotic callables that {@link requireFunction} — which matches on the
 * `Object#toString` tag — leaves out.
 *
 * @example
 * ```javascript
 * requireFunctionLike(() => {});   // => the same function
 * requireFunctionLike(class A {}); // => A
 * requireFunctionLike({});         // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} value - The value to validate as a function.
 * @param   {string} [message="Expected a function."] - Optional custom error message if the validation fails.
 * @returns {Function} The validated function.
 * @throws  {@link IllegalArgumentException} If the value is not callable.
 * @see     {@link isFunctionLike}
 * @see     {@link nonFunctionLike}
 * @see     {@link requireFunction}
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireFunctionLike(
  value: unknown,
  message: string = "Expected a function."
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): Function {
  if (!isFunctionLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
