import { isString } from "../../lang";
import { objectToString } from "../object";
import { isNil } from "./isNil";
import { isObject } from "./isObject";

/**
 * ## isEmpty
 *
 * Checks if a value is considered "empty".
 *
 * This function handles common JavaScript types:
 * - Returns `true` for `null` or `undefined`.
 * - Returns `true` for empty strings (`""`).
 * - Returns `true` for empty arrays (`[]`).
 * - Returns `true` for empty Set or Map objects (where `size` is 0).
 * - Returns `true` for plain JavaScript objects (`{}`) with no enumerable properties.
 * - Returns `false` for any other value, including numbers (even 0), booleans, functions,
 * or objects that are not empty according to the above rules.
 *
 * @param   {unknown} value - The value to check for emptiness.
 * @param   {boolean} [strict=false] - The strictness mode for string validation.
 * - If `false` (default), strings containing only whitespace characters (spaces, tabs, newlines)
 * are considered empty (using `trim()`). This is known as "blank" check.
 * - If `true`, only a string with zero length (`""`) is considered empty.
 * @returns {boolean} `true` if the value is empty; otherwise, `false`.
 * @see     {@link nonEmpty}
 * @since   1.0.0
 * @version 1.1.0
 */
export function isEmpty(value: unknown, strict: boolean = false): boolean {
  if (isNil(value)) {
    return true;
  }

  if (isString(value)) {
    return (strict ? value : value.trim()).length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  if (
    isObject(value) &&
    "length" in value &&
    typeof (value as { length: number }).length === "number"
  ) {
    return (value as { length: number }).length === 0;
  }

  if (isObject(value) && objectToString(value) === "[object Object]") {
    return Object.keys(value).length === 0;
  }

  return false;
}
