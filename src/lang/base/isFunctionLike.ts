import { nonNil } from "./nonNil";

/**
 * Checks if `value` is a function in a broader sense.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a function; otherwise, `false`.
 * @see     {@link isFunction}
 * @since   1.2.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunctionLike(value: unknown): value is Function {
  return nonNil(value) && typeof value === "function";
}
