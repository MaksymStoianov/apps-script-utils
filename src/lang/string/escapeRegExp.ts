import { EmptyStringException } from "../../exception";
import { isEmpty, isString } from "../base";

/**
 * Escapes special characters in a string to be safely used inside a regular expression.
 *
 * @param   value - The string to escape.
 * @returns The escaped string, safe for use in a regular expression.
 * @throws  {@link EmptyStringException}
 * @see     {@link escapeHtml}
 * @see     {@link escapeXml}
 * @since   1.0.0
 * @version 1.0.0
 */
export function escapeRegExp(value: string): string {
  if (!isString(value) || isEmpty(value)) {
    throw new EmptyStringException();
  }

  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
