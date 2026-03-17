import { isObject } from "../lang";

/**
 * Recursively sorts object keys and stringifies a value to ensure a deterministic output.
 * This is crucial for consistent hashing of objects.
 *
 * @param   {unknown} value - The value to stringify.
 * @returns {string} A stable JSON string representation of the value.
 * @see     {@link parseJson}
 * @since   1.0.0
 * @version 1.0.0
 */
export function stringifyJson(value: unknown): string {
  if (!isObject(value)) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((element) => stringifyJson(element)).join(",")}]`;
  }

  const keys = Object.keys(value).sort();

  const pairs = keys.map((key) => {
    const stringifiedKey = JSON.stringify(key);

    const stringifiedValue = stringifyJson((value as Record<string, unknown>)[key]);

    return `${stringifiedKey}:${stringifiedValue}`;
  });

  return `{${pairs.join(",")}}`;
}
