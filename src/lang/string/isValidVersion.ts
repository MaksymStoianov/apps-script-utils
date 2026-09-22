import { isEmpty, isString } from "../base";

const PATTERN = /^\d+$/;

/**
 * Checks if the provided string is a valid version string.
 *
 * @param   {string} value - The string value to validate as a version.
 * @returns {boolean} `true` if the input is a valid version string; otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isValidVersion(value: string): boolean {
  if (!isString(value) || isEmpty(value)) {
    return false;
  }

  const parts: string[] = value.split(".");

  return parts.every((part: string): boolean => PATTERN.test(part));
}
