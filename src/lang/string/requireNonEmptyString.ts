import { EmptyStringException } from "../../exception";
import { isEmpty, isString } from "../base";

/**
 * Validates that the provided value is a non-empty string.
 *
 * @param   {string | null | undefined} value - The string value to validate. Can be `null` or `undefined`.
 * @param   {string} [message] - Optional. A custom error message if the validation fails.
 * @returns {string} The validated non-empty string.
 * @throws  {@link EmptyStringException}
 * @since   1.0.0
 * @version 1.0.0
 */
export function requireNonEmptyString(
  value: string | null | undefined,
  message?: string
): string {
  if (!isString(value) || isEmpty(value)) {
    throw new EmptyStringException(message);
  }

  return value;
}
