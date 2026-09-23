import { isValidSlideId } from "./isValidSlideId";

/**
 * Checks if the provided value is NOT a valid slide identifier.
 *
 * The underlying check is a character test rather than a length one: any
 * non-empty run of letters, digits, hyphens and underscores qualifies, so a
 * single character passes. Contrast {@link isValidPresentationId}, which also
 * requires at least 25 characters.
 *
 * @example
 * ```javascript
 * nonValidSlideId("has space"); // => true
 * nonValidSlideId(""); // => true
 * nonValidSlideId("p1"); // => false
 * nonValidSlideId("SLIDES_api123"); // => false
 * ```
 *
 * @param       {unknown} value - The value to check.
 * @returns     {boolean} `true` if the value is not a valid slide identifier; otherwise, `false`.
 * @see         {@link isValidSlideId}
 * @see         {@link requireValidSlideId}
 * @see         [nonValidSlideId on the documentation site](https://maksymstoianov.github.io/apps-script-utils/nonvalidslideid.html)
 * @since       1.11.0
 * @version     1.0.0
 * @environment `Google Apps Script`, `Browser`
 */
export function nonValidSlideId(value: unknown): boolean {
  return !isValidSlideId(value);
}
