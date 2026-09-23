import { IllegalArgumentException } from "../../exception";
import { nonFunction } from "./nonFunction";

/**
 * Ensures that the provided value is NOT a function, throwing an exception otherwise.
 *
 * Useful where a value is expected but a callback was passed by mistake, or
 * where a value is about to be serialised — functions vanish silently from
 * `JSON.stringify` output.
 *
 * @example
 * ```javascript
 * requireNonFunction(42);        // => 42
 * requireNonFunction({ a: 1 });  // => { a: 1 }
 * requireNonFunction(() => {});  // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the value once the function case is excluded.
 * @param    {T} value - The value to validate as a non-function.
 * @param    {string} [message="Expected a non-function value."] - Optional custom error message if the validation fails.
 * @returns  {Exclude<T, Function>} The validated value.
 * @throws   {@link IllegalArgumentException} If the value is a function.
 * @see      {@link isFunction}
 * @see      {@link nonFunction}
 * @see      {@link requireFunction}
 * @see      [requireNonFunction on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireNonFunction.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireNonFunction<T>(
  value: T,
  message: string = "Expected a non-function value."
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): Exclude<T, Function> {
  if (!nonFunction(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
