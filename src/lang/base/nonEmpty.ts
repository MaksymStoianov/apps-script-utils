import { isEmpty } from "./isEmpty";

/**
 * Checks if a value is not considered "empty".
 *
 * @param   value - The value to check.
 * @returns `true` if the value is not "empty"; otherwise, `false`.
 * @see     {@link isEmpty}
 * @since   1.1.0
 * @version 1.0.0
 */
export function nonEmpty(value: unknown): boolean {
  return !isEmpty(value);
}
