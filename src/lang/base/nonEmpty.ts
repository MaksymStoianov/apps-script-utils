import { isEmpty } from "./isEmpty";

/**
 * Checks if a value is not considered "empty".
 *
 * @example
 * ```javascript
 * nonEmpty(0); // => true
 * nonEmpty(false); // => true
 * nonEmpty("a"); // => true
 * nonEmpty([0]); // => true
 * nonEmpty(null); // => false
 * nonEmpty(""); // => false
 * nonEmpty("   "); // => false
 * nonEmpty([]); // => false
 * nonEmpty({}); // => false
 * nonEmpty(new Map()); // => false
 * ```
 *
 * @param   {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not "empty"; otherwise, `false`.
 * @see     {@link isEmpty}
 * @see     [nonEmpty on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonempty.html)
 * @since   1.1.0
 * @version 1.0.0
 */
export function nonEmpty(value: unknown): boolean {
  return !isEmpty(value);
}
