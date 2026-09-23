import { versionCompare } from "./versionCompare";

/**
 * Checks if the current version is compatible with a required minimum version.
 *
 * @example
 * ```javascript
 * isVersionCompatible("1.3.0", "1.2.0"); // => true
 * isVersionCompatible("1.2.0", "1.3.0"); // => false
 * ```
 *
 * @param   {string} currentVersion - The version currently in use or being checked.
 * @param   {string} requiredVersion - The minimum version that is required for compatibility.
 * @returns {boolean} `true` if the `currentVersion` is greater than or equal to the `requiredVersion`; otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isVersionCompatible(currentVersion: string, requiredVersion: string): boolean {
  return versionCompare(currentVersion, requiredVersion) >= 0;
}
