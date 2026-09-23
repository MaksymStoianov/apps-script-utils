import { isValidPresentationId } from "./isValidPresentationId";

/**
 * Checks if the provided value is NOT a valid presentation identifier.
 *
 * Unlike {@link isValidSlideId}, the underlying check also constrains length:
 * at least 25 characters are required, matching the shape of a Drive file id.
 * Passing a full Slides URL therefore fails — extract the id first.
 *
 * @example
 * ```javascript
 * nonValidPresentationId("short-id"); // => true
 * nonValidPresentationId("has space in it and is long enough to pass"); // => true
 * nonValidPresentationId("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"); // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid presentation identifier; otherwise, `false`.
 * @see         {@link isValidPresentationId}
 * @see         {@link requireValidPresentationId}
 * @see         [nonValidPresentationId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonvalidpresentationid.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidPresentationId(value: unknown): boolean {
  return !isValidPresentationId(value);
}
