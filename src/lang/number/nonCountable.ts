import { isCountable } from "./isCountable";

/**
 * Checks if a value is NOT a countable number.
 *
 * A countable value is a non-negative safe integer — the kind of number that
 * can serve as a quantity, a length or a zero-based index.
 *
 * @example
 * ```javascript
 * nonCountable(-1); // => true
 * nonCountable(1.5); // => true
 * nonCountable(Number.MAX_SAFE_INTEGER + 2); // => true
 * nonCountable(0); // => false
 * nonCountable(42); // => false
 * ```
 *
 * @template T
 * @param   {T | number} value - The value to check.
 * @returns {boolean} `true` if the value is not a countable number, otherwise `false`.
 * @see     {@link isCountable}
 * @see     [nonCountable on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonCountable.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function nonCountable<T>(value: T | number): value is T {
  return !isCountable(value);
}
