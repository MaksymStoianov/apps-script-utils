import { ObjectTag, objectToString } from "../object";
import { isObject } from "./isObject";

/**
 * Checks if the provided value is a function.
 *
 * @param   value - The value to check.
 * @returns `true` if the value is a function; otherwise, `false`.
 * @see     {@link nonFunction}
 * @see     {@link isFunctionLike}
 * @since   1.0.0
 * @version 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  if (!isObject(value)) {
    return false;
  }

  const tag = objectToString(value) as ObjectTag;

  return [
    ObjectTag.FUNCTION,
    ObjectTag.GENERATOR_FUNCTION,
    ObjectTag.ASYNC_FUNCTION,
    ObjectTag.PROXY
  ].includes(tag);
}
