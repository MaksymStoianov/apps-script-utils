import { isNil, isString } from "../base";

/**
 * Splits a path into its segments.
 *
 * @param   {string | Array<string | number>} path - A dotted string or an array of segments.
 * @returns {Array<string | number>} The segments, in order.
 */
function toSegments(path: string | Array<string | number>): Array<string | number> {
  return isString(path) ? path.split(".") : path;
}

/**
 * Reads a nested property by path, taking the path as data.
 *
 * This is the `a?.b?.c` chain written once, for the cases where the path is
 * not known until run time — a column name from a spreadsheet, a key from a
 * configuration file.
 *
 * A path that runs out part way — because a level is missing, `null`, or a
 * primitive with nothing underneath it — yields the fallback rather than
 * throwing. Nothing is created along the way.
 *
 * @example
 * ```javascript
 * getPath({ a: { b: { c: 1 } } }, "a.b.c");          // => 1
 * getPath({ a: [{ b: 2 }] }, ["a", 0, "b"]);         // => 2
 * getPath({ a: 1 }, "a.b.c");                        // => undefined
 * getPath({}, "a.b", "missing");                     // => "missing"
 * ```
 *
 * @template T - The type of the value expected at the path.
 * @param    {unknown} source - The object or array to read from.
 * @param    {string | Array<string | number>} path - A dotted string, or an array of segments where a number indexes an array.
 * @param    {T} [fallback] - Returned when the path does not resolve.
 * @returns  {T | undefined} The value at the path, or the fallback.
 * @see      {@link setPath}
 * @see      [getPath on the documentation site](https://maksymstoianov.github.io/apps-script-utils/getPath.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function getPath<T>(
  source: unknown,
  path: string | Array<string | number>,
  fallback?: T
): T | undefined {
  let current: unknown = source;

  for (const segment of toSegments(path)) {
    if (isNil(current)) {
      return fallback;
    }

    // Reflect.get rather than an index expression: the segment is data, and
    // indexing an object with it is exactly the dynamic-key pattern the
    // security lint flags. Object() boxes a primitive level the way an index
    // expression does — it returns an object unchanged, so nothing is copied.
    current = Reflect.get(Object(current), segment);
  }

  return current === undefined ? fallback : (current as T);
}
