import { IllegalArgumentException } from "../../exception";
import { requireNonEmptyString } from "../../lang";
import { isValidSheetName } from "./isValidSheetName";
import { parseA1Notation } from "./parseA1Notation";

export function extractSheetNameFromA1Notation(a1Notation: string): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  const gridRange = parseA1Notation(a1Notation);

  const sheetName = requireNonEmptyString(gridRange.sheetName);

  if (!isValidSheetName(sheetName)) {
    throw new Error();
  }

  return sheetName;
}
