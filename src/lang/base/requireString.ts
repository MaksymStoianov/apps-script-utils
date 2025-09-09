import { InvalidStringException } from "../../exception";
import { nonString } from "./nonString";

/**
 * ## requireString
 *
 * Ensures that the provided value is a string, throwing an error otherwise.
 *
 * @param   value - The value to validate as a string.
 * @param   [message] - Optional custom error message if the validation fails.
 * @returns The validated string if the input is a valid string.
 * @throws  {@link InvalidStringException}
 * @see     {@link isString}
 * @see     {@link nonString}
 * @see     {@link requireNonEmptyString}
 * @since   1.0.0
 * @version 1.0.0
 */
export function requireString(value: unknown, message?: string): string {
  if (nonString(value)) {
    throw new InvalidStringException(message);
  }

  return value;
}
