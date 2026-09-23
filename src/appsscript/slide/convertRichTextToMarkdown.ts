import { IllegalArgumentException } from "../../exception";
import { isObjectLike, isString, requireArray } from "../../lang";
import type { RichTextRun, TextStyle, Theme } from "./convertMarkdownToRichText";

/**
 * Converts an array of {@link RichTextRun} objects back into Markdown.
 *
 * @example
 * ```javascript
 * const runs = convertMarkdownToRichText("**bold** and `code`");
 * const markdown = convertRichTextToMarkdown(runs);
 *
 * console.log(markdown); // **bold** and `code`
 * ```
 *
 * @param       {RichTextRun[]} runs - The runs to convert. An empty array yields an empty string.
 * @param       {Theme} [theme={}] - The theme the runs were styled with, used to recognise code runs.
 * @returns     {string} The Markdown representing the runs.
 * @throws      {@link IllegalArgumentException} If no argument is passed, or an element is not a run.
 * @see         {@link convertMarkdownToRichText}
 * @since       2.0.0
 * @version     2.0.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function convertRichTextToMarkdown(runs: RichTextRun[], theme: Theme = {}): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  requireArray(runs);

  // A code run carries no flag of its own: it is recognised by the font the
  // theme gives code, which is why the pair round-trips under one theme.
  const codeFontFamily = theme.codeTheme?.fontFamily || "Courier New";

  const baseFontFamily = theme.fontFamily || "Arial";

  return runs
    .map((run) => {
      if (!isObjectLike(run) || !isString(run.text)) {
        throw new IllegalArgumentException("Expected an array of RichTextRun objects.");
      }

      if (run.text.length === 0) {
        return "";
      }

      const style: TextStyle = isObjectLike(run.style) ? run.style : {};

      let text = run.text;

      // Innermost first: code spans take no nested markup, and a link wraps
      // whatever styling its text carries.
      if (style.fontFamily === codeFontFamily && codeFontFamily !== baseFontFamily) {
        text = `\`${text}\``;
      }

      if (style.strikethrough === true) {
        text = `~~${text}~~`;
      }

      if (style.italic === true) {
        text = `*${text}*`;
      }

      if (style.bold === true) {
        text = `**${text}**`;
      }

      if (isObjectLike(style.link) && isString(style.link.url)) {
        text = `[${text}](${style.link.url})`;
      }

      return text;
    })
    .join("");
}
