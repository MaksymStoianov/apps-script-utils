import { IllegalArgumentException } from "../../exception";
import { isObject, requireNonEmptyString } from "../../lang";
import { parseA1Notation } from "./parseA1Notation";
import { GridRange } from "./types";

export interface A1NotationParseOptions {
  includeSheetNames?: boolean;
}

/**
 * ## parseA1Notations
 *
 * Parses a comma-separated string of A1 notations into an array of {@link GridRange} objects.
 * Validates the format and sheet name requirements based on the provided options.
 *
 * @param       {string} value - The input string to be parsed.
 * @param       {A1NotationParseOptions} options - An object with options for parsing.
 * @returns     {GridRange[]} An array of {@link GridRange} objects.
 * @throws      {@link Error}
 * @throws      {@link IllegalArgumentException}
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
export function parseA1Notations(
  value: string,
  { includeSheetNames }: A1NotationParseOptions
): GridRange[] {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const trimmedInput = requireNonEmptyString(value).trim();

  if (trimmedInput === "") {
    return [];
  }

  const ranges = trimmedInput
    .split(",")
    .map(item => item.trim())
    .filter(Boolean)
    .map(parseA1Notation);

  if (!ranges.every(isObject)) {
    throw new Error("One or more values are not valid ranges.");
  }

  for (const range of ranges) {
    if (includeSheetNames === true && !range.sheetName) {
      throw new Error(
        `Missing sheet name in "${range.a1Notation}". Ranges must include a sheet name.`
      );
    }

    if (includeSheetNames === false && range.sheetName) {
      throw new Error(
        `Sheet names are not allowed. Found a sheet name in "${range.a1Notation}".`
      );
    }
  }

  return ranges;
}
