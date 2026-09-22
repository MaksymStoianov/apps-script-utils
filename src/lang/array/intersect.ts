import { isArray } from "../base";

/**
 * Creates a new array of the values present in every one of the given arrays.
 *
 * Order is taken from the first array and the result is deduplicated, so a
 * value repeated in the first array appears once. Values are compared with
 * `SameValueZero`, so `NaN` intersects with `NaN`.
 *
 * The remaining arrays each become a set once and the first is walked a single
 * time, so the cost is linear rather than a nested scan.
 *
 * @example
 * ```javascript
 * intersect([1, 2, 3], [2, 3, 4]);          // => [2, 3]
 * intersect([1, 2, 3], [2, 3], [3, 9]);     // => [3]
 * intersect([1, 1, 2], [1, 2]);             // => [1, 2] (deduplicated)
 * intersect([1, 2], [9]);                   // => []
 * intersect([1, 2]);                        // => [1, 2] (deduplicated)
 * intersect();                              // => []
 * ```
 *
 * @template T - The type of elements in the input arrays.
 * @param    {...T[]} arrays - The arrays to intersect.
 * @returns  {T[]} A new array of the shared values, in the order of the first array. The inputs are left untouched.
 * @throws   {@link TypeError} If any argument is not an array.
 * @see      {@link unique}
 * @see      {@link without}
 * @since    1.11.0
 * @version  1.0.0
 */
export function intersect<T>(...arrays: T[][]): T[] {
  for (const array of arrays) {
    if (!isArray(array)) {
      throw new TypeError("Every input must be an array.");
    }
  }

  const [first, ...rest] = arrays;

  if (!first) {
    return [];
  }

  const others = rest.map((array: T[]): Set<T> => new Set(array));

  const seen = new Set<T>();

  const result: T[] = [];

  for (const value of first) {
    if (seen.has(value)) {
      continue;
    }

    if (others.every((other: Set<T>): boolean => other.has(value))) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}
