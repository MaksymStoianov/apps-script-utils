import { isValidVersion } from "./isValidVersion";

/**
 * Compares two "standardized" version number strings.
 *
 * This function compares two version strings (e.g., "1.0", "1.2.3")
 * segment by segment. It expects the version strings to be valid
 * as per `isValidVersion`.
 *
 * @param   {string} version1 - The first version string to compare.
 * @param   {string} version2 - The second version string to compare.
 * @returns {number}
 *  - `-1` if the first version is less than the second;
 *  - `0` if they are equal;
 *  - `1` if the first version is greater than the second.
 * @throws  {@link TypeError}
 * @since   1.0.0
 * @version 1.0.0
 */
export function versionCompare(version1: string, version2: string): number {
  if (!isValidVersion(version1)) {
    throw new TypeError(`The version1 parameter has an invalid value.`);
  }

  if (!isValidVersion(version2)) {
    throw new TypeError(`The version2 parameter has an invalid value.`);
  }

  const parseVersionString = (versionString: string): number[] =>
    versionString
      .split(".")
      .map(Number)
      .map((item: number): number => (Number.isNaN(item) || !Number.isInteger(item) ? 0 : item));

  const parsedVersion1: number[] = parseVersionString(version1);

  const parsedVersion2: number[] = parseVersionString(version2);

  while (parsedVersion1.length > 0 || parsedVersion2.length > 0) {
    const n1: number = parsedVersion1.shift() ?? 0;

    const n2: number = parsedVersion2.shift() ?? 0;

    if (n1 > n2) {
      return 1;
    }

    if (n2 > n1) {
      return -1;
    }
  }

  return 0;
}
