import { requireNonEmptyString } from "./requireNonEmptyString";

interface Options {
  clean?: boolean;
  trim?: boolean;
}

/**
 * Converts a string to `snake_case` format.
 *
 * `snake_case` is a naming convention where words are separated by underscores (`_`),
 * and all letters are in lowercase.
 *
 * This function handles spaces, hyphens, and camelCase transitions by inserting underscores.
 * It also normalizes underscores by removing leading/trailing ones and collapsing multiples.
 *
 * @example (Default Behavior - keeps other characters)
 * ```javascript
 * const text = "Hello world! How are you?";
 * const result = toSnakeCase(text);
 *
 * console.log(result); // hello_world!_how_are_you?
 * ```
 *
 * @example (Strict Cleaning - removes other characters)
 * ```javascript
 * const text = "Hello world! How are you?";
 * const result = toSnakeCase(text, { clean: true });
 *
 * console.log(result); // hello_world_how_are_you
 * ```
 *
 * @example (With Input Trimming)
 * ```javascript
 * const textWithWhitespace = "  Hello world  ";
 * const resultTrimmed = toSnakeCase(textWithWhitespace, { trimInput: true });
 *
 * console.log(resultTrimmed); // hello_world
 * ```
 *
 * @param   value - The input string to convert.
 * @param   [options] - Optional configuration options.
 * @returns The string converted to snake_case.
 * @throws  {@link EmptyStringException}
 * @see     {@link toCamelCase}
 * @see     {@link toKebabCase}
 * @see     {@link toLowerCase}
 * @see     {@link toProperCase}
 * @see     {@link toUpperCase}
 * @since   1.0.0
 * @version 1.0.0
 */
export function toSnakeCase(value: string, options?: Options): string {
  const effectiveOptions: Required<Options> = {
    clean: false,
    trim: false,
    ...(options || {})
  };

  let result = requireNonEmptyString(value)
    .replace(/[\s-]/g, "_")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase();

  if (effectiveOptions.clean !== false) {
    result = result.replace(/[^a-zA-Z0-9_]/g, "");
  }

  if (effectiveOptions.trim === true) {
    result = result.trim().replace(/_+/g, "_");
  }

  return result;
}
