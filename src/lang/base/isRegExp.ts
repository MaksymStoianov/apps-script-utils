import { ObjectTag, objectToString } from "../object";

/**
 * Checks if the provided value is a regular expression.
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a regular expression (`RegExp` object); otherwise, `false`.
 * @since   1.0.0
 * @version 1.0.0
 */
export function isRegExp(value: unknown): value is RegExp {
  return objectToString(value) === ObjectTag.REG_EXP;
}
