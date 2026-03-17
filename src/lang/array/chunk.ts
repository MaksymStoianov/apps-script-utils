import { isArray } from "../base";
import { isInteger } from "../number";

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * This function handles various edge cases, including non-array inputs,
 * non-integer or negative `size` values, and empty arrays.
 *
 * @example
 * ```javascript
 * chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]
 * chunk(['a', 'b', 'c', 'd', 'e'], 2); // => [['a', 'b'], ['c', 'd'], ['e']]
 * chunk(['a', 'b', 'c'], 0); // => []
 * chunk(['a', 'b', 'c']); // => [['a'], ['b'], ['c']] (size defaults to 1)
 * chunk([]); // => []
 * chunk("not an array", 2); // Throws TypeError: Input 'array' must be an array.
 * chunk([1, 2, 3], 1.5); // Throws TypeError: Input 'size' must be an integer.
 * ```
 *
 * @template T - The type of elements in the input array.
 * @param   array - The array to process.
 * @param   [size = 1] - The length of each chunk. Must be a non-negative integer.
 * @returns A new array of chunks. Each chunk is an array of elements.
 * @throws  {@link TypeError} If `array` is not an array.
 * @throws  {@link TypeError} If `size` is not an integer.
 * @since   1.0.0
 * @version 1.2.0
 */
export function chunk<T>(array: T[], size: number = 1): Array<T[]> {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  if (!isInteger(size)) {
    throw new TypeError("Input 'size' must be an integer.");
  }

  size = Math.max(size, 0);

  const length = array.length;

  if (length === 0 || size < 1) {
    return [];
  }

  const result = new Array(Math.ceil(length / size));

  let index = 0;

  let resIndex = 0;

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }

  return result;
}
