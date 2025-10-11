import { isString } from "@/lang";
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
 * @param   value - The value to check for emptiness.
 * @returns `true` if the value is empty; otherwise, `false`.
 * @see     {@link nonEmpty}
 * @since   1.0.0
 * @version 1.1.0
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true;
  }

  if (isString(value)) {
    return value.length === 0;
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
