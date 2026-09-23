import { IllegalArgumentException } from "../../exception";
import { isValidSlideId } from "./isValidSlideId";

/**
 * Ensures that the provided value is a valid slide identifier,
 * throwing an exception otherwise.
 *
 * The check is on shape, not existence: it rejects values the Slides API could
 * never have produced, but a well-formed identifier may still refer to no
 * slide at all.
 *
 * @example
 * ```javascript
 * requireValidSlideId("g1a2b3c4d5_0");  // => "g1a2b3c4d5_0"
 * requireValidSlideId("p1 p2");         // Throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a valid slide id."] - Optional custom error message if the validation fails.
 * @returns     {string} The validated slide identifier.
 * @throws      {@link IllegalArgumentException} If the value is not a valid slide identifier.
 * @see         {@link isValidSlideId}
 * @see         {@link nonValidSlideId}
 * @see         [requireValidSlideId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/requireValidSlideId.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireValidSlideId(
  value: unknown,
  message: string = "Expected a valid slide id."
): string {
  if (!isValidSlideId(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
