import { isFloat } from "./isFloat";

/**
 * Checks if a value is NOT a finite number carrying a fractional part.
 *
 * Mirrors {@link isFloat}, so integers, `NaN`, both infinities and every
 * non-numeric value qualify: each of them lacks an observable fraction.
 *
 * @example
 * ```javascript
 * nonFloat(42);        // => true
 * nonFloat(1.0);       // => true (identical to 1 at runtime)
 * nonFloat(Infinity);  // => true
 * nonFloat("1.5");     // => true
 * nonFloat(1.5);       // => false
 * ```
 *
 * @template T - The type of the value once the fractional number case is excluded.
 * @param    {T | number} value - The value to check.
 * @returns  {boolean} `true` if the value is not a fractional number, otherwise `false`.
 * @see      {@link isFloat}
 * @see      {@link nonInteger}
 * @see      [nonFloat on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonFloat.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function nonFloat<T>(value: T | number): value is T {
  return !isFloat(value);
}
