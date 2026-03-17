import { requireNonEmptyString } from "./requireNonEmptyString";

interface ToKebabCaseOptions {
  clean?: boolean;
  trim?: boolean;
}

/**
 * Converts a string to `kebab-case` format.
 *
 * `kebab-case` is a naming convention where words are separated by hyphens (`-`),
 * and all letters are in lowercase.
 *
 * This function handles spaces, underscores, and camelCase transitions by inserting hyphens.
 * It also cleans up multiple or leading/trailing hyphens.
 *
 * @example (Default Behavior)
 * ```javascript
 * const text = "Hello world! How are you?";
 * const result = toKebabCase(text);
 *
 * console.log(result); // hello-world!-how-are-you
 * ```
 *
 * @example (Strict Cleaning)
 * ```javascript
 * const text = "Hello world! How are you?";
 * const result = toKebabCase(text, { clean: true });
 *
 * console.log(result); // hello-world-how-are-you
 * ```
 *
 * @param   {string} value - The input string to convert.
 * @param   {ToKebabCaseOptions} [options] - Optional configuration options.
 * @returns {string} The string converted to kebab-case.
 * @throws  {@link EmptyStringException}
 * @see     {@link toCamelCase}
 * @see     {@link toLowerCase}
 * @see     {@link toProperCase}
 * @see     {@link toSnakeCase}
 * @see     {@link toUpperCase}
 * @since   1.0.0
 * @version 1.0.0
 */
export function toKebabCase(value: string, options: ToKebabCaseOptions = {}): string {
  const effectiveOptions: Required<ToKebabCaseOptions> = {
    clean: false,
    trim: false,
    ...options
  };

  let result = requireNonEmptyString(value)
    .replace(/[\s_]/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  if (effectiveOptions.clean !== false) {
    result = result.replace(/[^a-zA-Z0-9-]/g, "");
  }

  if (effectiveOptions.trim === true) {
    result = result.trim().replace(/-+/g, "-");
  }

  return result;
}
