import { IllegalArgumentException } from "../../exception";
import { isValidVersion } from "./isValidVersion";
import { requireNonEmptyString } from "./requireNonEmptyString";

/**
 * Validates that the provided value is a non-empty string holding a valid version.
 *
 * A valid version is one or more dot-separated numeric segments. Pre-release
 * and build metadata (`1.0.0-alpha`, `1.0.0+build`) and a leading `v` are not
 * accepted — this is not a SemVer parser.
 *
 * @example
 * ```javascript
 * requireValidVersion("1.0.0");    // => "1.0.0"
 * requireValidVersion("1");        // => "1"
 * requireValidVersion("v1.0.0");   // Throws IllegalArgumentException
 * requireValidVersion("");         // Throws EmptyStringException
 * ```
 *
 * @param   {string | null | undefined} value - The value to validate as a version.
 * @param   {string} [message="Expected a valid version."] - Optional custom error message if the validation fails.
 * @returns {string} The validated version.
 * @throws  {@link EmptyStringException} If the value is not a non-empty string.
 * @throws  {@link IllegalArgumentException} If the value is not a valid version.
 * @see     {@link isValidVersion}
 * @see     {@link nonValidVersion}
 * @see     {@link versionCompare}
 * @see     [requireValidVersion on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireValidVersion.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireValidVersion(
  value: string | null | undefined,
  message: string = "Expected a valid version."
): string {
  const version = requireNonEmptyString(value, message);

  if (!isValidVersion(version)) {
    throw new IllegalArgumentException(message);
  }

  return version;
}
