import { is2DArray } from "apps-script-utils";

/**
 * Counts the cells of a value that may or may not be a matrix. Inside the
 * guard the value is narrowed to `Array<Array<unknown>>`.
 */
export function countCells(value: unknown): number {
  if (!is2DArray(value)) {
    return 0;
  }

  return value.reduce((total: number, row: unknown[]): number => total + row.length, 0);
}
