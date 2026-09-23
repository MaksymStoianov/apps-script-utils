import { isDouble } from "./isDouble";

/**
 * Checks if a value is NOT a finite number carrying a fractional part.
 *
 * A synonym of {@link nonFloat}, mirroring {@link isDouble}: integers, `NaN`,
 * both infinities and every non-numeric value qualify, because none of them
 * carries an observable fraction.
 *
 * @example
 * ```javascript
 * nonDouble(42);        // => true
 * nonDouble(1.0);       // => true (identical to 1 at runtime)
 * nonDouble(Infinity);  // => true
 * nonDouble("1.5");     // => true
 * nonDouble(1.5);       // => false
 * ```
 *
 * @template T - The type of the value once the fractional number case is excluded.
 * @param    {T | number} value - The value to check.
 * @returns  {boolean} `true` if the value is not a fractional number, otherwise `false`.
 * @see      {@link isDouble}
 * @see      {@link nonFloat}
 * @see      [nonDouble on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonDouble.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function nonDouble<T>(value: T | number): value is T {
  return !isDouble(value);
}
