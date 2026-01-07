import { nonNegative } from "./nonNegative";

export function isCountable(value: unknown): value is number {
  return nonNegative(value) && Number.isSafeInteger(value);
}
