import { IllegalArgumentException } from "../../exception";
import { isNil, isString } from "../base";
import { getPath } from "../object";

/**
 * Matches `{{ key }}`. Deliberately not built from user input: the pattern is
 * a literal with a single negated character class, so there is no nested
 * quantifier to backtrack over and no way to hand it a pathological one.
 */
const PLACEHOLDER: RegExp = /\{\{([^{}]*)\}\}/g;

/**
 * How `merge` fills a template.
 *
 * @since   1.11.0
 * @version 1.0.0
 */
export interface MergeOptions {
  /**
   * What to do with a placeholder whose key is absent, `null` or `undefined`.
   *
   * `"keep"`, the default, leaves the placeholder in the output, where it is
   * visible and easy to trace back. `"empty"` substitutes an empty string,
   * which is tidier in something a reader will see.
   */
  onMissing?: "keep" | "empty";

  /**
   * Applied to each substituted value before it goes into the output.
   *
   * Pass `escapeHtml` for an HTML template. It is deliberately not automatic:
   * escaping a plain-text template mangles it.
   */
  escape?: (value: string) => string;
}

/**
 * Substitutes values from an object into `{{ key }}` placeholders in a
 * template.
 *
 * This is the operation behind every generated email body and sheet-driven
 * document in an Apps Script project.
 *
 * Keys are resolved with {@link getPath}, so `{{ user.name }}` reaches into a
 * nested object, and surrounding whitespace inside the braces is ignored. A
 * placeholder may repeat; each occurrence is filled.
 *
 * By default a key that resolves to nothing leaves its placeholder standing,
 * because a visible `{{ user.emial }}` in the output is how the typo gets
 * found. Pass `onMissing: "empty"` for the tidier behaviour.
 *
 * @example
 * ```javascript
 * merge("Hello, {{ name }}!", { name: "Ada" });
 * // => "Hello, Ada!"
 *
 * merge("{{ user.name }} <{{ user.email }}>", { user: { name: "Ada", email: "a@b.c" } });
 * // => "Ada <a@b.c>"
 *
 * merge("Hello, {{ name }}!", {});
 * // => "Hello, {{ name }}!"
 *
 * merge("Hello, {{ name }}!", {}, { onMissing: "empty" });
 * // => "Hello, !"
 *
 * merge("<p>{{ bio }}</p>", { bio: "<script>" }, { escape: escapeHtml });
 * // => "<p>&lt;script&gt;</p>"
 * ```
 *
 * @param   {string} template - The template to fill.
 * @param   {object} data - The object the placeholder keys are resolved against.
 * @param   {MergeOptions} [options] - How to treat missing keys, and how to escape values.
 * @returns {string} The filled template.
 * @throws  {@link IllegalArgumentException} If `template` is not a string.
 * @throws  {@link IllegalArgumentException} If `data` is not an object.
 * @see     {@link getPath}
 * @see     {@link escapeHtml}
 * @since   1.11.0
 * @version 1.0.0
 */
export function merge(template: string, data: object, options: MergeOptions = {}): string {
  if (!isString(template)) {
    throw new IllegalArgumentException("Expected 'template' to be a string.");
  }

  if (isNil(data) || typeof data !== "object") {
    throw new IllegalArgumentException("Expected 'data' to be an object.");
  }

  const { onMissing = "keep", escape } = options;

  return template.replace(PLACEHOLDER, (placeholder: string, rawKey: string): string => {
    const key: string = rawKey.trim();

    if (key === "") {
      return placeholder;
    }

    const value: unknown = getPath(data, key);

    if (isNil(value)) {
      return onMissing === "empty" ? "" : placeholder;
    }

    const text: string = String(value);

    return escape ? escape(text) : text;
  });
}
