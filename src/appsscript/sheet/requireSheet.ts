import { InvalidSheetException } from "../../exception";
import { isSheet } from "./isSheet";

/**
 * ## requireSheet
 *
 * Ensures that the provided value is a valid <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object, throwing an exception otherwise.
 *
 * @param   value - The value to validate as a <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @param   [message] - Optional custom error message if the validation fails.
 * @returns The validated <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a> object.
 * @throws  <a href="../../exception/appsscript/sheet/InvalidSheetException.ts"><code>InvalidSheetException</code></a>
 * @see     {@link isSheet}
 * @see     {@link nonSheet}
 * @see     <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since   1.5.0
 * @version 1.0.0
 */
export function requireSheet(
  value: unknown,
  message?: string
): GoogleAppsScript.Spreadsheet.Sheet {
  if (!isSheet(value)) {
    throw new InvalidSheetException(message);
  }

  return value;
}
