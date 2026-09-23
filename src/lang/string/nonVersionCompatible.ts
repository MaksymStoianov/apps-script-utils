import { isVersionCompatible } from "./isVersionCompatible";

/**
 * Checks if the current version is NOT compatible with the required one,
 * that is, if it is strictly lower.
 *
 * Both arguments must be valid versions. Invalid input is rejected by
 * {@link versionCompare} with a `TypeError` rather than reported as
 * incompatibility — "is A at least B" has no meaningful answer when either
 * side is not a version. Use {@link isValidVersion} first when the input is
 * untrusted.
 *
 * @example
 * ```javascript
 * nonVersionCompatible("1.2.0", "1.0.0");  // => false
 * nonVersionCompatible("1.0.0", "1.2.0");  // => true
 * nonVersionCompatible("abc", "1.0.0");    // Throws TypeError
 * ```
 *
 * @param   {string} currentVersion - The version to test.
 * @param   {string} requiredVersion - The minimum acceptable version.
 * @returns {boolean} `true` if the current version is lower than the required one; otherwise, `false`.
 * @throws  {@link TypeError} If either argument is not a valid version.
 * @see     {@link isVersionCompatible}
 * @see     {@link versionCompare}
 * @see     [nonVersionCompatible on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonversioncompatible.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonVersionCompatible(currentVersion: string, requiredVersion: string): boolean {
  return !isVersionCompatible(currentVersion, requiredVersion);
}
