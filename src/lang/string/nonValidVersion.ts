import { isValidVersion } from "./isValidVersion";

/**
 * Checks if the provided string is NOT a valid version.
 *
 * @param   {string} value - The string value to check.
 * @returns {boolean} `true` if the value is not a valid version; otherwise, `false`.
 * @see     {@link isValidVersion}
 * @see     {@link versionCompare}
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidVersion(value: string): boolean {
  return !isValidVersion(value);
}
