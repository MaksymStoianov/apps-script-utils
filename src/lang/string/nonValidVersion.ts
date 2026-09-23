import { isValidVersion } from "./isValidVersion";

/**
 * Checks if the provided string is NOT a valid version.
 *
 * @example
 * ```javascript
 * nonValidVersion("1.2.3-beta"); // => true
 * nonValidVersion("v1.2"); // => true
 * nonValidVersion("1..2"); // => true
 * nonValidVersion("1"); // => false
 * nonValidVersion("1.2.3"); // => false
 * nonValidVersion("2026.01.15"); // => false
 * ```
 *
 * @param   {string} value - The string value to check.
 * @returns {boolean} `true` if the value is not a valid version; otherwise, `false`.
 * @see     {@link isValidVersion}
 * @see     {@link versionCompare}
 * @see     [nonValidVersion on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonvalidversion.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidVersion(value: string): boolean {
  return !isValidVersion(value);
}
