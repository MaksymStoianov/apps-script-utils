import { isString } from "../../lang";

/**
 * Validates if the given string is a valid Google Slides slide ID.
 *
 * @param {unknown} value The value to check.
 * @returns {value is string} `true` if the value is a valid slide ID, `false` otherwise.
 * @since 1.5.0
 */
export function isValidSlideId(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9-_]+$/.test(value);
}
