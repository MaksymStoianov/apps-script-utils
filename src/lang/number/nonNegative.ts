import { isNumber } from "../base";

export function nonNegative(value: unknown): value is number {
  return isNumber(value) && !isNaN(value) && value >= 0;
}
