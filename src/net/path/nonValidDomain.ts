import { isValidDomain } from "./isValidDomain";

/**
 * Checks if the provided value is NOT a valid domain name.
 *
 * @example
 * ```javascript
 * nonValidDomain("example.com");   // => false
 * nonValidDomain("example");       // => true  (no TLD)
 * nonValidDomain("-example.com");  // => true
 * ```
 *
 * @param   {string} domain - The value to check.
 * @returns {boolean} `true` if the value is not a valid domain name; otherwise, `false`.
 * @see     {@link isValidDomain}
 * @see     {@link requireValidDomain}
 * @see     [nonValidDomain on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonValidDomain.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonValidDomain(domain: string): boolean {
  return !isValidDomain(domain);
}
