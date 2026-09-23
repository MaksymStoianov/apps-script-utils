import { isString } from "./isString";

/**
 * Checks if the provided value is NOT `string`.
 *
 * @example
 * ```javascript
 * nonString(1); // => true
 * nonString(null); // => true
 * nonString([]); // => true
 * nonString(""); // => false
 * nonString("abc"); // => false
 * ```
 *
 * @template T
 * @param   {T | string} value - The value to check.
 * @returns {boolean} `true` if the value is not `string`; otherwise, `false`.
 * @see     {@link isString}
 * @see     {@link requireString}
 * @see     [nonString on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonstring.html)
 * @since   1.0.0
 * @version 1.1.0
 */
export function nonString<T>(value: T | string): value is T {
  return !isString(value);
}
