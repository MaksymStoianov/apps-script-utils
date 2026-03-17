import { requireNonEmptyString } from "./requireNonEmptyString";

interface Options {
  trim?: boolean;
}

/**
 * Returns a new string with the first letter of each word capitalized and the rest lowercased (Proper Case / Title Case).
 *
 * This function processes the input string to capitalize the first letter of every
 * word and convert the remaining letters of each word to lowercase.
 * Optionally, it can also normalize whitespace.
 *
 * @example (Default Behavior)
 * ```javascript
 * const text = "hello WORLD! how are you?";
 * const result = toProperCase(text);
 *
 * console.log(result); // Hello World! How Are You?
 * ```
 *
 * @example (With Trimming)
 * ```javascript
 * const textWithWhitespace = "  hello   world!  how are you?  ";
 * const trimmedResult = toProperCase(textWithWhitespace, { trim: true });
 *
 * console.log(trimmedResult); // Hello World! How Are You?
 * ```
 *
 * @param   value - The input string to convert.
 * @param   [options] - Optional configuration options.
 * @returns The string converted to proper case, with optional whitespace normalization.
 * @throws  {@link EmptyStringException}
 * @see     {@link toCamelCase}
 * @see     {@link toKebabCase}
 * @see     {@link toLowerCase}
 * @see     {@link toSnakeCase}
 * @see     {@link toUpperCase}
 * @since   1.0.0
 * @version 1.0.0
 */
export function toProperCase(value: string, options: Options = {}): string {
  const effectiveOptions: Required<Options> = {
    trim: false,
    ...options
  };

  let result = requireNonEmptyString(value).replace(
    /\b\w+\b/g,
    match => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
  );

  if (effectiveOptions.trim === true) {
    result = result.trim().replace(/\s+/g, " ");
  }

  return result;
}
