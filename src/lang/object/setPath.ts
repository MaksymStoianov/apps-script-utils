import { IllegalArgumentException } from "../../exception";
import { isNil, isString } from "../base";

/**
 * Keys that reach the prototype chain. A path arriving from user input or a
 * spreadsheet cell can contain any of them, and a setter that follows one
 * modifies `Object.prototype` for the rest of the execution.
 */
const BLOCKED_KEYS: ReadonlySet<string> = new Set(["__proto__", "constructor", "prototype"]);

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
 * Writes a nested property by path, creating the levels that are missing.
 *
 * The target is modified in place and returned, so calls chain.
 *
 * **Prototype pollution is rejected outright.** A segment named `__proto__`,
 * `constructor` or `prototype` throws rather than being written, because a
 * path that reaches one of them changes `Object.prototype` for everything
 * running afterwards — and such a path is exactly what arrives from a
 * spreadsheet cell or a query string.
 *
 * A level that is missing, `null`, or a primitive is replaced by a fresh
 * container. That container is an array only when the next segment is a
 * `number` in an array path: in a dotted string every segment is a string, and
 * `"0"` is a legitimate object key, so `"a.0.b"` builds plain objects.
 *
 * @example
 * ```javascript
 * setPath({}, "a.b.c", 1);              // => { a: { b: { c: 1 } } }
 * setPath({ a: {} }, ["a", 0], "x");    // => { a: { 0: "x" } }
 * setPath({}, ["a", 0, "b"], 1);        // => { a: [{ b: 1 }] }
 * setPath({}, "__proto__.polluted", 1); // Throws IllegalArgumentException
 * ```
 *
 * @template T - The type of the target object.
 * @param    {T} target - The object or array to write into. Modified in place.
 * @param    {string | Array<string | number>} path - A dotted string, or an array of segments where a number indexes an array.
 * @param    {unknown} value - The value to write at the path.
 * @returns  {T} The target.
 * @throws   {@link IllegalArgumentException} If `target` is not an object.
 * @throws   {@link IllegalArgumentException} If `path` names no segments.
 * @throws   {@link IllegalArgumentException} If any segment reaches the prototype chain.
 * @see      {@link getPath}
 * @see      [setPath on the documentation site](https://maksymstoianov.github.io/apps-script-utils/setpath.html)
 * @since    1.11.0
 * @version  1.0.0
 */
export function setPath<T extends object>(
  target: T,
  path: string | Array<string | number>,
  value: unknown
): T {
  if (isNil(target) || typeof target !== "object") {
    throw new IllegalArgumentException("Expected an object to write into.");
  }

  const segments: Array<string | number> = toSegments(path);

  if (segments.length === 0) {
    throw new IllegalArgumentException("Expected a path naming at least one key.");
  }

  for (const segment of segments) {
    const key: string = String(segment);

    if (BLOCKED_KEYS.has(key)) {
      throw new IllegalArgumentException(`Refusing to write through the key "${key}".`);
    }
  }

  let current: object = target;

  // Walk one segment behind: seeing the next segment is what says whether the
  // level being created should be an array or a plain object, and it keeps the
  // loop free of index arithmetic over the path.
  let pending: string | number | null = null;

  for (const segment of segments) {
    if (pending !== null) {
      const existing: unknown = Reflect.get(current, pending);

      if (isNil(existing) || typeof existing !== "object") {
        const container: object = typeof segment === "number" ? [] : {};

        Reflect.set(current, pending, container);

        current = container;
      } else {
        current = existing;
      }
    }

    pending = segment;
  }

  Reflect.set(current, pending as string | number, value);

  return target;
}
