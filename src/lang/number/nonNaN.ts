import { isNaN } from "./isNaN";

/**
 * Checks if a value is NOT the `NaN` number.
 *
 * Mirrors {@link isNaN}, which does not coerce its argument: a string, `null`
 * or `undefined` is not the `NaN` number and therefore qualifies here, even
 * though the global `isNaN` reports each of them as `NaN` after conversion.
 *
 * @example
 * ```javascript
 * nonNaN(42);         // => true
 * nonNaN(Infinity);   // => true
 * nonNaN("abc");      // => true (the global isNaN returns true)
 * nonNaN(undefined);  // => true (the global isNaN returns true)
 * nonNaN(NaN);        // => false
 * ```
 *
 * @template T - The type of the value once the `NaN` case is excluded.
 * @param    {T | number} value - The value to check.
 * @returns  {boolean} `true` if the value is not the `NaN` number, otherwise `false`.
 * @see      {@link isNaN}
 * @see      [nonNaN on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonNaN.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function nonNaN<T>(value: T | number): value is T {
  return !isNaN(value);
}
