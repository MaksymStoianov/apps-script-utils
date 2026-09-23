import { IllegalArgumentException } from "../../exception";
import { isNil } from "../base";

/**
 * Decides whether a value is a level to descend into rather than a value to
 * keep.
 *
 * Arrays are values here, not structure. So are `Date` and `RegExp`, and so is
 * the empty object — each has no own enumerable key to contribute, and
 * dropping it would lose the fact that it was there.
 *
 * @param   {unknown} value - The value to classify.
 * @returns {boolean} `true` if the value should be flattened into its parent.
 */
function isNested(value: unknown): boolean {
  const isPlainObject: boolean =
    !isNil(value) && typeof value === "object" && !Array.isArray(value);

  if (!isPlainObject) {
    return false;
  }

  return Object.keys(value as object).length > 0;
}

/**
 * Flattens a nested object into a single level whose keys are the paths that
 * reached each value.
 *
 * `{ a: { b: 1 } }` becomes `{ "a.b": 1 }` — the shape a spreadsheet row or a
 * flat configuration file can hold, and the inverse of what {@link setPath}
 * does one key at a time.
 *
 * Arrays are treated as values and kept whole rather than expanded into
 * `a.0`, `a.1`: descending into them produces keys that no longer round-trip,
 * and flattening arrays is what `lang/array` is for. An empty object is a
 * value too, kept rather than dropped.
 *
 * This is **not** the array `flat`, which removes nesting from arrays. The two
 * share a name and nothing else.
 *
 * @example
 * ```javascript
 * flat({ a: { b: { c: 1 } } });          // => { "a.b.c": 1 }
 * flat({ a: { b: { c: 1 } } }, 1);       // => { "a.b": { c: 1 } }
 * flat({ a: { b: 1 } }, 0);              // => { a: { b: 1 } }
 * flat({ a: [1, 2], b: {} });            // => { a: [1, 2], b: {} }
 * ```
 *
 * @param   {object} source - The object to flatten. Left untouched.
 * @param   {number} [depth=Infinity] - How many levels to expand. `0` copies the object as it is.
 * @returns {Record<string, unknown>} A new, single-level object.
 * @throws  {@link IllegalArgumentException} If `source` is not a non-array object.
 * @throws  {@link IllegalArgumentException} If `depth` is negative or not a whole number.
 * @see     {@link setPath}
 * @see     {@link getPath}
 * @see     [flat on the documentation site](https://maksymstoianov.github.io/apps-script-utils/flat.html)
 * @since   1.11.0
 * @version 1.0.0
 */
export function flat(source: object, depth: number = Infinity): Record<string, unknown> {
  const isPlainObject: boolean =
    !isNil(source) && typeof source === "object" && !Array.isArray(source);

  if (!isPlainObject) {
    throw new IllegalArgumentException("Expected a non-array object to flatten.");
  }

  const isWholeDepth: boolean = Number.isInteger(depth) || depth === Infinity;

  if (!isWholeDepth || depth < 0) {
    throw new IllegalArgumentException("Expected 'depth' to be a non-negative whole number.");
  }

  // One pass per level rather than recursion: the Apps Script runtime has a
  // shallower stack than Node, and a deeply nested object would exhaust it.
  let entries: Array<[string, unknown]> = Object.entries(source);

  for (let level = 0; level < depth; level++) {
    const expanded: Array<[string, unknown]> = [];

    let descended: boolean = false;

    for (const [key, value] of entries) {
      if (!isNested(value)) {
        expanded.push([key, value]);

        continue;
      }

      descended = true;

      for (const [childKey, childValue] of Object.entries(value as object)) {
        expanded.push([`${key}.${childKey}`, childValue]);
      }
    }

    if (!descended) {
      break;
    }

    entries = expanded;
  }

  return Object.fromEntries(entries);
}
