import { InvalidStringException } from "@/exception";
import { isString } from "../base/isString";

/**
 * Validates that the given value is a non-empty string.
 *
 * @param {unknown} value The value to check.
 * @param {string} [name="value"] The name of the value for the error message.
 * @returns {string} The non-empty string.
 * @throws {InvalidStringException} If the value is not a string or is empty.
 * @since 1.5.0
 */
export function nonEmptyString(value: unknown, name: string = "value"): string {
  if (!isString(value) || value.trim().length === 0) {
    throw new InvalidStringException(`${name} must be a non-empty string.`);
  }

  return value;
}
