import { IllegalArgumentException } from "../../exception";
import { requireNonEmptyString } from "../../lang";
import { isValidSheetName } from "./isValidSheetName";
import { parseA1Notation } from "./parseA1Notation";

/**
 * ## updateSheetNameInA1Notation
 *
 * Updates or sets the sheet name within an A1 notation string, while preserving the range information (e.g., `A1:B2`).
 *
 * @param       {string} a1Notation - The source A1 notation, which may or may not include a sheet name (e.g., `'Sheet Name'!A1:B2` or `A1:B2`).
 * @param       {string|null} [sheetName] - The new sheet name to set.
 * Pass `null` or `undefined` to remove any existing sheet name and return only the range.
 * @returns     {string} The new A1 notation string with the updated sheet name (e.g., `'New Sheet'!A1:B2` or just `A1:B2`).
 * @throws      <a href="../../exception/IllegalArgumentException.ts"><code>IllegalArgumentException</code></a>
 * @throws      <a href="../../exception/EmptyStringException.ts"><code>EmptyStringException</code></a>
 * @see         {@link parseA1Notation}
 * @see         <a href="./types/GridRange.ts"><code>GridRange</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/range"><code>Range</code></a>
 * @see         <a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet"><code>Sheet</code></a>
 * @since       1.6.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function updateSheetNameInA1Notation(
  a1Notation: string,
  sheetName?: string | null
): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const gridRange = parseA1Notation(a1Notation);

  const range = requireNonEmptyString(gridRange.a1Notation);

  if (!isValidSheetName(sheetName)) {
    return range;
  }

  const isSimpleSheetName = /^[A-Z_][A-Z0-9_]*$/i.test(sheetName);

  if (isSimpleSheetName) {
    return `${sheetName}!${range}`;
  }

  if (!sheetName.includes("'")) {
    return `'${sheetName}'!${range}`;
  }

  if (!sheetName.includes('"')) {
    return `"${sheetName}"!${range}`;
  }

  return `'${sheetName.replace(/'/g, "''")}'!${range}`;
}
