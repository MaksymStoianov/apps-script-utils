import { IllegalArgumentException } from "../../exception";
import { isFunctionLike } from "./isFunctionLike";

/**
 * Ensures that the provided value is NOT callable, throwing an exception otherwise.
 *
 * Broader than {@link requireNonFunction} in intent, though both reject the
 * same `typeof "function"` values: this one pairs with {@link isFunctionLike},
 * which covers exotic callables such as async generator functions.
 *
 * @example
 * ```javascript
 * requireNonFunctionLike(42);          // => 42
 * requireNonFunctionLike(class A {});  // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the callable case is excluded.
 * @param    {T | Function} value - The value to validate as non-callable.
 * @param    {string} [message="Expected a non-function value."] - Optional custom error message if the validation fails.
 * @returns  {T} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is callable.
 * @see      {@link isFunctionLike}
 * @see      {@link nonFunctionLike}
 * @see      {@link requireFunctionLike}
 * @see      [requireNonFunctionLike on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonFunctionLike.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonFunctionLike<T>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  value: T | Function,
  message: string = "Expected a non-function value."
): T {
  if (isFunctionLike(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
