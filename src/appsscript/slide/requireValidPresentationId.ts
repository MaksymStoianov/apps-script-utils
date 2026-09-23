import { IllegalArgumentException } from "../../exception";
import { isValidPresentationId } from "./isValidPresentationId";

/**
 * Ensures that the provided value is a valid presentation identifier,
 * throwing an exception otherwise.
 *
 * At least 25 characters are required, matching the shape of a Drive file id.
 * A full Slides URL therefore fails — extract the id from it first.
 *
 * The check is on shape, not existence: a well-formed identifier may still
 * refer to no presentation.
 *
 * @example
 * ```javascript
 * requireValidPresentationId("1AbCdEfGhIjKlMnOpQrStUvWx");  // => the same id
 * requireValidPresentationId("p1");                          // Throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a valid presentation id."] - Optional custom error message if the validation fails.
 * @returns     {string} The validated presentation identifier.
 * @throws      {@link IllegalArgumentException} If the value is not a valid presentation identifier.
 * @see         {@link isValidPresentationId}
 * @see         {@link nonValidPresentationId}
 * @see         [requireValidPresentationId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requirevalidpresentationid.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireValidPresentationId(
  value: unknown,
  message: string = "Expected a valid presentation id."
): string {
  if (!isValidPresentationId(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
