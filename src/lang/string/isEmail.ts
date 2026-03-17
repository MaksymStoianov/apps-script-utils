import { isValidDomain } from "../../net";
import { isEmpty, isString } from "../base";

/**
 * Checks if the given input value is a valid email string.
 *
 * @example
 * ```javascript
 * isEmail("test@example.com"); // Returns: true
 * isEmail("invalid-email");    // Returns: false
 * isEmail(123);                // Returns: false
 * isEmail("");                 // Returns: false
 * ```
 *
 * @param   email - The value to check, which could be of any type.
 * @returns `true` if the value is a non-empty string and matches a common email format; otherwise, `false`.
 * @see     {@link requireValidEmail}
 * @since   1.0.0
 * @version 1.0.0
 */
export function isEmail(email: unknown): email is string {
  if (!isString(email) || isEmpty(email)) {
    return false;
  }

  const parts = email.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const [usernamePart, domain] = parts;

  if (!isValidDomain(domain)) {
    return false;
  }

  const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;

  const plusIndex = usernamePart.indexOf("+");

  if (plusIndex !== -1) {
    const username = usernamePart.substring(0, plusIndex);

    const alias = usernamePart.substring(plusIndex + 1);

    const ALIAS_PATTERN = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]*$/;

    return USERNAME_PATTERN.test(username) && ALIAS_PATTERN.test(alias);
  } else {
    return USERNAME_PATTERN.test(usernamePart);
  }
}
