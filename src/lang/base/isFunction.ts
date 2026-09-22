import { ObjectTag, objectToString } from "../object";
import { isNil } from "./isNil";

/**
 * Checks if the provided value is a function.
 *
 * @example
 * ```javascript
 * isFunction(function () {}); // => true
 * isFunction(async function () {}); // => true
 * isFunction(Math.max); // => true
 * isFunction(null); // => false
 * isFunction("fn"); // => false
 * isFunction({}); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a function; otherwise, `false`.
 * @see     {@link nonFunction}
 * @see     {@link isFunctionLike}
 * @since   1.0.0
 * @version 1.2.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  if (isNil(value)) {
    return false;
  }

  const tag = objectToString(value) as ObjectTag;

  return [
    ObjectTag.FUNCTION,
    ObjectTag.GENERATOR_FUNCTION,
    ObjectTag.ASYNC_FUNCTION,
    ObjectTag.ASYNC_GENERATOR_FUNCTION
  ].includes(tag);
}
