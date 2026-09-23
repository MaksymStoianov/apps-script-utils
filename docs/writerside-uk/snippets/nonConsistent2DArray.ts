import { non2DArray, nonConsistent2DArray } from "apps-script-utils";

/**
 * Tells the two failure cases apart: not a matrix at all, versus a matrix
 * whose rows differ in length.
 */
export function describeShape(rows: unknown): string {
  if (non2DArray(rows)) {
    return "not a matrix";
  }

  if (nonConsistent2DArray(rows)) {
    return "a matrix, but the rows differ in length";
  }

  return "ready for setValues";
}
