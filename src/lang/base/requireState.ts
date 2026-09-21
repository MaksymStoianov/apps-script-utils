import { IllegalStateException } from "../../exception";

/**
 * Ensures that a condition holds, throwing {@link IllegalStateException} otherwise.
 *
 * Every other `require*` guard checks a value the caller was handed. This one checks a condition the
 * caller controls — that a resource has been loaded, that a step has not already run, that an
 * iterator is not exhausted. It is typed as an assertion, so a narrowing expression narrows.
 *
 * @example
 * ```javascript
 * requireState(this.sheet !== null, "Sheet has not been loaded.");
 * this.sheet.getName(); // narrowed to Sheet
 * ```
 *
 * @param       {unknown} condition - The condition that must be truthy.
 * @param       {string} [message] - The message for the exception; a default is used when omitted.
 * @returns     {void}
 * @throws      {IllegalStateException} If `condition` is falsy.
 * @see         {@link IllegalStateException}
 * @see         {@link requireNonNull}
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function requireState(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new IllegalStateException(message);
  }
}
