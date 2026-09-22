import { IllegalArgumentException } from "../../exception";
import { is2DArray } from "./is2DArray";

/**
 * Ensures that the given input is a non-empty two-dimensional array,
 * throwing an exception otherwise.
 *
 * The check to run in front of
 * <a href="https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues"><code>Range#setValues</code></a>,
 * which rejects a flat array with a message that names neither the argument
 * nor the reason.
 *
 * @example
 * ```javascript
 * require2DArray([[1, 2], [3, 4]]);  // => [[1, 2], [3, 4]]
 * require2DArray([1, 2]);            // Throws IllegalArgumentException
 * require2DArray([]);                // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of elements within the rows.
 * @param    {unknown} value - The value to validate as a two-dimensional array.
 * @param    {string} [message="Expected a non-empty two-dimensional array."] - Optional custom error message if the validation fails.
 * @returns  {T[][]} The validated two-dimensional array.
 * @throws   {@link IllegalArgumentException} If the value is not a non-empty two-dimensional array.
 * @see      {@link is2DArray}
 * @see      {@link non2DArray}
 * @see      {@link requireConsistent2DArray}
 * @since    1.11.0
 * @version  1.0.0
 */
export function require2DArray<T>(
  value: unknown,
  message: string = "Expected a non-empty two-dimensional array."
): T[][] {
  if (!is2DArray(value)) {
    throw new IllegalArgumentException(message);
  }

  return value as T[][];
}
