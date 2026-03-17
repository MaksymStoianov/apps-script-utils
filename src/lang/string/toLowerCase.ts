import { requireNonEmptyString } from "./requireNonEmptyString";

interface ToLowerCaseOptions {
  trim?: boolean;
}

/**
 * Returns a new string converted to lowercase.
 *
 * @example
 * ```javascript
 * const text = "  Hello   world!  ";
 * const result = toLowerCase(text);
 *
 * console.log(result); //   hello   world!
 *
 * const trimmedResult = toLowerCase(text, { trim: true });
 * console.log(trimmedResult); // hello world!
 * ```
 *
 * @param   {string} value - The input string to convert.
 * @param   {ToLowerCaseOptions} [options] - Optional configuration options.
 * @returns {string} The string converted to lowercase, with optional whitespace normalization.
 * @throws  {@link EmptyStringException}
 * @see     {@link toCamelCase}
 * @see     {@link toKebabCase}
 * @see     {@link toProperCase}
 * @see     {@link toSnakeCase}
 * @see     {@link toUpperCase}
 * @since   1.0.0
 * @version 1.0.0
 */
export function toLowerCase(value: string, options: ToLowerCaseOptions = {}): string {
  const effectiveOptions: Required<ToLowerCaseOptions> = {
    trim: false,
    ...options
  };

  let result = requireNonEmptyString(value).toLowerCase();

  if (effectiveOptions.trim === true) {
    result = result.trim().replace(/\s+/g, " ");
  }

  return result;
}
