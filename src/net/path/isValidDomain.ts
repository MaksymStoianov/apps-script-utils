import { isEmpty, isString } from "../../lang";

/**
 * Checks if a given string represents a syntactically valid domain name.
 *
 * @param       {string} domain - The string to check for valid domain name syntax.
 * @returns     {boolean} `true` if the string is a syntactically valid domain name; otherwise, `false`.
 * @environment `Google Apps Script`, `Browser`
 */
export function isValidDomain(domain: string): domain is string {
  if (!isString(domain) || isEmpty(domain)) {
    return false;
  }

  if (domain.includes("..")) {
    return false;
  }

  if (
    domain.startsWith("-") ||
    domain.endsWith("-") ||
    domain.startsWith(".") ||
    domain.endsWith(".")
  ) {
    return false;
  }

  const parts = domain.split(".");

  if (parts.length < 2) {
    return false;
  }

  const LABEL_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

  for (const part of parts) {
    if (part.length === 0) {
      return false;
    }

    if (!LABEL_PATTERN.test(part)) {
      return false;
    }
  }

  const tld = parts[parts.length - 1];

  return !(tld.length < 2 || !/^[a-zA-Z]+$/.test(tld));
}
