import { isEmpty, isString } from "../../lang";

/**
 * Checks if a given string represents a syntactically valid domain name.
 *
 * @example
 * ```javascript
 * isValidDomain("example.com"); // => true
 * isValidDomain("sub.example.co.uk"); // => true
 * isValidDomain("-example.com"); // => false
 * isValidDomain("example..com"); // => false
 * isValidDomain("example.com."); // => false
 * isValidDomain(""); // => false
 * ```
 *
 * @param       {string} domain - The string to check for valid domain name syntax.
 * @returns     {boolean} `true` if the string is a syntactically valid domain name; otherwise, `false`.
 * @see [isValidDomain on the documentation site](https://maksymstoianov.github.io/apps-script-utils/isValidDomain.html)
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidDomain(domain: string): domain is string {
  if (!isString(domain) || isEmpty(domain)) {
    return false;
  }

  if (domain.includes("..")) {
    return false;
  }

  const hasInvalidEdge: boolean =
    domain.startsWith("-") ||
    domain.endsWith("-") ||
    domain.startsWith(".") ||
    domain.endsWith(".");

  if (hasInvalidEdge) {
    return false;
  }

  const parts: Array<string> = domain.split(".");

  if (parts.length < 2) {
    return false;
  }

  const LABEL_PATTERN = /^[a-zA-Z0-9-]+$/;

  for (const part of parts) {
    if (part.length === 0) {
      return false;
    }

    if (part.startsWith("-") || part.endsWith("-")) {
      return false;
    }

    if (!LABEL_PATTERN.test(part)) {
      return false;
    }
  }

  const tld: string = parts[parts.length - 1];

  return !(tld.length < 2 || !/^[a-zA-Z]+$/.test(tld));
}
