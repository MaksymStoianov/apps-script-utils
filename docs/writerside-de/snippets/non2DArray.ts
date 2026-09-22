import { non2DArray, nonConsistent2DArray } from "apps-script-utils";

/**
 * Validates the shape of a value before it reaches `setValues`, and returns
 * the reason it was rejected rather than throwing.
 */
export function validateShape(rows: unknown): string | null {
  if (non2DArray(rows)) {
    return "Expected a matrix: a non-empty array of rows.";
  }

  if (nonConsistent2DArray(rows)) {
    return "Every row must have the same number of columns.";
  }

  return null;
}
