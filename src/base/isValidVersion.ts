import { isEmpty } from "./isEmpty";
import { isString } from "./isString";

/**
 * ## isValidVersion
 *
 * Checks if the provided string is a valid version string.
 *
 * @param   value - The string value to validate as a version.
 * @returns `true` if the input is a valid version string; otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isValidVersion(value: string): boolean {
  return isString(value) && !isEmpty(value) && /(\d+)(\.\d+)?/.test(value);
}
