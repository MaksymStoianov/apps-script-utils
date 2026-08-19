import { EmptyStringException, IllegalArgumentException } from "../../exception";
import { isObject, requireNonEmptyString } from "../../lang";
import { parseA1Notation } from "./parseA1Notation";
import { GridRange } from "./types";

export interface A1NotationParseOptions {
  includeSheetNames?: boolean;

  /**
   * Error message when one or more values are not valid ranges.
   */
  validationError?: string;

  /**
   * Error message when a sheet name is missing.
   * Use `%s` as a placeholder for the A1 notation.
   */
  missingSheetNameError?: string;

  /**
   * Error message when a sheet name is present but not allowed.
   * Use `%s` as a placeholder for the A1 notation.
   */
  unexpectedSheetNameError?: string;
}

/**
 * Parses a comma-separated string of A1 notations into an array of {@link GridRange} objects.
 * Validates the format and sheet name requirements based on the provided options.
 *
 * @param       {string} value - The input string to be parsed.
 * @param       {A1NotationParseOptions} options - An object with options for parsing.
 * @returns     {GridRange[]} An array of {@link GridRange} objects.
 * @throws      {IllegalArgumentException} If the `value` is not a string.
 * @throws      {EmptyStringException} If the `value` is an empty string.
 * @throws      {SyntaxError} If one of the A1 notations is invalid.
 * @throws      {Error} If `validationError` occurs (default: "One or more values are not valid ranges.").
 * @throws      {Error} If `missingSheetNameError` occurs (default: "Missing sheet name in \"%s\". Ranges must include a sheet name.").
 * @throws      {Error} If `unexpectedSheetNameError` occurs (default: "Sheet names are not allowed. Found a sheet name in \"%s\".").
 * @see         {@link parseA1Notation}
 * @see         {@link GridRange}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         {@link GoogleAppsScript.Spreadsheet.Sheet|Sheet}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.6.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function parseA1Notations(value: string, options: A1NotationParseOptions = {}): GridRange[] {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const {
    includeSheetNames,
    validationError = "One or more values are not valid ranges.",
    missingSheetNameError = 'Missing sheet name in "%s". Ranges must include a sheet name.',
    unexpectedSheetNameError = 'Sheet names are not allowed. Found a sheet name in "%s".'
  } = options;

  const trimmedInput = requireNonEmptyString(value).trim();

  if (trimmedInput === "") {
    return [];
  }

  const ranges: GridRange[] = trimmedInput
    .split(",")
    .map((item: string): string => item.trim())
    .filter(Boolean)
    .map(parseA1Notation);

  if (!ranges.every(isObject)) {
    throw new Error(validationError);
  }

  for (const range of ranges) {
    if (includeSheetNames === true && !range.sheetName) {
      throw new Error(missingSheetNameError.replace(/%s/g, range.a1Notation || "undefined"));
    }

    if (includeSheetNames === false && range.sheetName) {
      throw new Error(unexpectedSheetNameError.replace(/%s/g, range.a1Notation || "undefined"));
    }
  }

  return ranges;
}
