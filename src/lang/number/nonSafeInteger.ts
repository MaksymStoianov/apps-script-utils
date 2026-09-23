import { isSafeInteger } from "./isSafeInteger";

/**
 * Checks if a value is NOT a safe integer.
 *
 * Mirrors {@link isSafeInteger}, so a whole number outside the range that an
 * IEEE-754 double represents exactly qualifies: beyond it distinct
 * mathematical integers collapse onto the same value and arithmetic silently
 * stops being exact.
 *
 * @example
 * ```javascript
 * nonSafeInteger(Number.MAX_SAFE_INTEGER + 2);  // => true
 * nonSafeInteger(1.5);                          // => true
 * nonSafeInteger("42");                         // => true
 * nonSafeInteger(42);                           // => false
 * ```
 *
 * @template T - The type of the value once the safe integer case is excluded.
 * @param    {T | number} value - The value to check.
 * @returns  {boolean} `true` if the value is not a safe integer, otherwise `false`.
 * @see      {@link isSafeInteger}
 * @see      {@link nonInteger}
 * @see      [nonSafeInteger on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonsafeinteger.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function nonSafeInteger<T>(value: T | number): value is T {
  return !isSafeInteger(value);
}
