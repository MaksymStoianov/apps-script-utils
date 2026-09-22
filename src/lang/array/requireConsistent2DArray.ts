import { IllegalArgumentException } from "../../exception";
import { is2DArray } from "./is2DArray";

/**
 * Ensures that the given input is a two-dimensional array whose rows all have
 * the same length, throwing an exception otherwise.
 *
 * When the rows differ, the default message reports the offending row and both
 * lengths — the information needed to fix the call, and precisely what
 * <a href="https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues"><code>Range#setValues</code></a>
 * withholds when it rejects a ragged matrix.
 *
 * @example
 * ```javascript
 * requireConsistent2DArray([[1, 2], [3, 4]]);  // => [[1, 2], [3, 4]]
 * requireConsistent2DArray([[1, 2], [3]]);     // Throws: row 1 has 1 column, expected 2.
 * requireConsistent2DArray([1, 2]);            // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of elements within the rows.
 * @param    {unknown} value - The value to validate as a consistent two-dimensional array.
 * @param    {string} [message] - Optional custom error message if the validation fails.
 * @returns  {T[][]} The validated two-dimensional array.
 * @throws   {@link IllegalArgumentException} If the value is not a consistent two-dimensional array.
 * @see      {@link isConsistent2DArray}
 * @see      {@link nonConsistent2DArray}
 * @see      {@link require2DArray}
 * @since    1.11.0
 * @version  1.0.0
 */
export function requireConsistent2DArray<T>(value: unknown, message?: string): T[][] {
  if (!is2DArray(value)) {
    throw new IllegalArgumentException(message ?? "Expected a non-empty two-dimensional array.");
  }

  const width = value[0].length;

  const offending = value.findIndex((row: unknown[]): boolean => row.length !== width);

  if (offending !== -1) {
    throw new IllegalArgumentException(
      message ??
        `Expected every row to have ${width} columns, but row ${offending} has ${value[offending].length}.`
    );
  }

  return value as T[][];
}
