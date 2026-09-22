import { isValidPresentationId } from "./isValidPresentationId";

/**
 * Checks if the provided value is NOT a valid presentation identifier.
 *
 * Unlike {@link isValidSlideId}, the underlying check also constrains length:
 * at least 25 characters are required, matching the shape of a Drive file id.
 * Passing a full Slides URL therefore fails — extract the id first.
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid presentation identifier; otherwise, `false`.
 * @see         {@link isValidPresentationId}
 * @see         {@link requireValidPresentationId}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidPresentationId(value: unknown): boolean {
  return !isValidPresentationId(value);
}
