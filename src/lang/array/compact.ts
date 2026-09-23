import { isArray } from "../base";

/**
 * The values JavaScript treats as false in a boolean context.
 *
 * @example
 * ```javascript
 * const values = [0, "", false, null, undefined];
 * ```
 *
 * @see [Falsy on the documentation site](https://maksymstoianov.github.io/apps-script-utils/falsy.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export type Falsy = false | null | undefined | 0 | 0n | "";

/**
 * Creates a new array with every falsy value removed: `false`, `null`,
 * `undefined`, `0`, `-0`, `0n`, `""` and `NaN`.
 *
 * The result narrows without a cast, which a plain `array.filter(Boolean)`
 * does not: TypeScript keeps the original element type there, so the caller
 * has to assert it back.
 *
 * Note that `0` and `""` are dropped. For spreadsheet data that is frequently
 * the wrong tool — `0` is a legitimate number and an empty cell arrives as
 * `""` — and `array.filter(nonNil)` is what removes only the absent values.
 *
 * @example
 * ```javascript
 * compact([0, 1, false, 2, "", 3, null]);  // => [1, 2, 3]
 * compact([NaN, undefined]);               // => []
 * compact([0, ""]);                        // => [] (both are dropped)
 * ```
 *
 * @template T - The type of the elements that survive the filter.
 * @param    {Array<T | Falsy>} array - The array to compact.
 * @returns  {T[]} A new array without the falsy values. The input is left untouched.
 * @throws   {@link TypeError} If `array` is not an array.
 * @see      {@link nonNil}
 * @see      [compact on the documentation site](https://maksymstoianov.github.io/apps-script-utils/compact.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function compact<T>(array: Array<T | Falsy>): T[] {
  if (!isArray(array)) {
    throw new TypeError("Input 'array' must be an array.");
  }

  return array.filter((value: T | Falsy): value is T => Boolean(value));
}
