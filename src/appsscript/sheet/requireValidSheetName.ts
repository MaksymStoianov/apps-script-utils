import { IllegalArgumentException } from "../../exception";
import { isValidSheetName } from "./isValidSheetName";

/**
 * Ensures that the provided value is a valid sheet name,
 * throwing an exception otherwise.
 *
 * The guard to place in front of `insertSheet` or `setName`, both of which
 * reject a bad name with a message that does not say which rule was broken.
 *
 * A name is valid when it is a non-empty string of at most 100 characters,
 * contains none of `\ / ? * [ ]`, and is not the reserved `History`.
 *
 * @example
 * ```javascript
 * requireValidSheetName("Report 2024");  // => "Report 2024"
 * requireValidSheetName("Q1/Q2");        // Throws IllegalArgumentException
 * requireValidSheetName("History");      // Throws IllegalArgumentException
 * ```
 *
 * @param       {unknown} value - The value to validate.
 * @param       {string} [message="Expected a valid sheet name."] - Optional custom error message if the validation fails.
 * @returns     {string} The validated sheet name.
 * @throws      {@link IllegalArgumentException} If the value is not a valid sheet name.
 * @see         {@link isValidSheetName}
 * @see         {@link nonValidSheetName}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function requireValidSheetName(
  value: unknown,
  message: string = "Expected a valid sheet name."
): string {
  if (!isValidSheetName(value)) {
    throw new IllegalArgumentException(message);
  }

  return value;
}
