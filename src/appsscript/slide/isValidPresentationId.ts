import { isString } from "../../lang";

/**
 * Validates if the given string is a valid Google Slides presentation ID.
 *
 * @param {unknown} value The value to check.
 * @returns {value is string} `true` if the value is a valid presentation ID, `false` otherwise.
 * @since 1.5.0
 */
export function isValidPresentationId(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9-_]{25,}$/.test(value);
}
