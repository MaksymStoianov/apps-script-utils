import { IllegalArgumentException } from "../../exception";

export function extractRangeFromA1Notation(a1Notation: string): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }
}
