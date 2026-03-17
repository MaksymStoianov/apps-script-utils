import { InvalidEmailFormatException } from "../../exception";
import { isEmail } from "./isEmail";
import { requireNonEmptyString } from "./requireNonEmptyString";

/**
 * Validates that the provided value is a non-empty string and a valid email format.
 *
 * @param   {string | null | undefined} email - The string value representing an email to validate. Can be `null` or `undefined`.
 * @param   {string} [message] - Optional. A custom error message if the validation fails.
 * @returns {string} The validated, non-empty, and validly formatted email string.
 * @throws  {@link EmptyStringException}
 * @throws  {@link InvalidEmailFormatException}
 * @see     {@link isEmail}
 * @since   1.0.0
 * @version 1.0.0
 */
export function requireValidEmail(email: string | null | undefined, message?: string): string {
  const value = requireNonEmptyString(email, message);

  if (!isEmail(value)) {
    throw new InvalidEmailFormatException(message);
  }

  return value;
}
