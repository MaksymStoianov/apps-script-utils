import { stringifyJson } from "../../json";
import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined
} from "../base";
import { objectToString } from "./objectToString";

/**
 * Computes a 32-bit hash code for a given value.
 *
 * @param   {unknown} value - The input value to compute the hash for.
 * @returns {number} The computed 32-bit hash code.
 * @throws  {@link TypeError}
 * @since   1.0.0
 * @version 1.3.0
 */
export function hashCode(value: unknown): number {
  let str: string;

  const isPrimitive = isString(value) || isNumber(value) || isBoolean(value);

  if (isPrimitive) {
    str = String(value);
  } else if (value === null) {
    str = "null";
  } else if (isUndefined(value)) {
    str = "undefined";
  } else if (isNull(value)) {
    str = "null";
  } else if (isObject(value)) {
    try {
      str = objectToString(value) + stringifyJson(value);
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.warn("Could not stringify object for hashing:", err);
      str = String(value);
    }
  } else {
    const valueType = typeof value;

    throw new TypeError(`Unsupported input type for hashing: ${valueType}.`);
  }

  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return hash;
}
