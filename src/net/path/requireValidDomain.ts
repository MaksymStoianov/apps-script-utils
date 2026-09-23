import { IllegalArgumentException } from "../../exception";
import { isValidDomain } from "./isValidDomain";

/**
 * Ensures that the provided value is a valid domain name,
 * throwing an exception otherwise.
 *
 * At least two labels are required, so a bare host such as `localhost` is
 * rejected. Internationalised names must be punycode-encoded first: the label
 * pattern is ASCII-only.
 *
 * @example
 * ```javascript
 * requireValidDomain("example.com");   // => "example.com"
 * requireValidDomain("localhost");     // Throws IllegalArgumentException
 * requireValidDomain("");              // Throws IllegalArgumentException
 * ```
 *
 * @param   {unknown} domain - The value to validate as a domain name.
 * @param   {string} [message="Expected a valid domain name."] - Optional custom error message if the validation fails.
 * @returns {string} The validated domain name.
 * @throws  {@link IllegalArgumentException} If the value is not a valid domain name.
 * @see     {@link isValidDomain}
 * @see     {@link nonValidDomain}
 * @see     [requireValidDomain on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirevaliddomain.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function requireValidDomain(
  domain: unknown,
  message: string = "Expected a valid domain name."
): string {
  if (!isValidDomain(domain as string)) {
    throw new IllegalArgumentException(message);
  }

  return domain as string;
}
