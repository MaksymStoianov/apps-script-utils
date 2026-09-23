import { IllegalArgumentException } from "../../exception";
import { isVersionCompatible } from "./isVersionCompatible";

/**
 * Ensures that the current version is at least the required one,
 * throwing an exception otherwise.
 *
 * The default message names both versions, since an assertion that reports
 * only "incompatible" gives nothing to act on in a log.
 *
 * Returns the current version rather than nothing, so the check composes:
 * `const v = requireVersionCompatible(installed, "1.4.0");`
 *
 * @example
 * ```javascript
 * requireVersionCompatible("1.2.0", "1.0.0");  // => "1.2.0"
 * requireVersionCompatible("1.0.0", "1.2.0");  // Throws IllegalArgumentException
 * requireVersionCompatible("abc", "1.0.0");    // Throws TypeError
 * ```
 *
 * @param   {string} currentVersion - The version to test.
 * @param   {string} requiredVersion - The minimum acceptable version.
 * @param   {string} [message] - Optional custom error message if the validation fails.
 * @returns {string} The validated current version.
 * @throws  {@link TypeError} If either argument is not a valid version.
 * @throws  {@link IllegalArgumentException} If the current version is lower than the required one.
 * @see     {@link isVersionCompatible}
 * @see     {@link nonVersionCompatible}
 * @see     [requireVersionCompatible on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireversioncompatible.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireVersionCompatible(
  currentVersion: string,
  requiredVersion: string,
  message?: string
): string {
  if (!isVersionCompatible(currentVersion, requiredVersion)) {
    throw new IllegalArgumentException(
      message ?? `Version ${currentVersion} is lower than the required ${requiredVersion}.`
    );
  }

  return currentVersion;
}
