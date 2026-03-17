import { IllegalArgumentException } from "../../exception";
import { isRichTextValue } from "./isRichTextValue";

/**
 * Converts a [`RichTextValue`](https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value) object into HTML, preserving text formatting.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet1');
 * const range = sheet.getRange('A1');
 * const richTextValue = range.getRichTextValue();
 * const html = convertRichTextToHtml(richTextValue);
 *
 * console.log(html);
 * ```
 *
 * @param       richText - The {@link GoogleAppsScript.Spreadsheet.RichTextValue|RichTextValue} object containing formatted text.
 * @returns     The HTML string representing the formatted text.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link GoogleAppsScript.Spreadsheet.RichTextValue|RichTextValue}
 * @see         [Class RichTextValue](https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function convertRichTextToHtml(
  richText: GoogleAppsScript.Spreadsheet.RichTextValue
): string {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  if (!isRichTextValue(richText)) {
    throw new TypeError('Expected an object of type "RichTextValue".');
  }

  const runs = richText.getRuns();

  let html = "";

  /**
   * @param {object} input
   */
  const _toStringStyles = (input: object): string =>
    Object.entries(input)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");

  /**
   * @param {object} input
   */
  const _toStringAttrs = (input: object): string =>
    Object.entries(input)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

  for (const run of runs) {
    const textStyle = run.getTextStyle();

    const attributes: Record<string, string> = {};

    const styles: Record<string, string> = {};

    const tags: string[] = [];

    if (textStyle.isStrikethrough()) {
      tags.push("s");
    }

    if (textStyle.isUnderline()) {
      tags.push("u");
    }

    if (textStyle.isBold()) {
      tags.push("b");
    }

    if (textStyle.isItalic()) {
      tags.push("i");
    }

    const fontFamily = textStyle.getFontFamily();

    if (fontFamily && fontFamily !== "Arial") {
      styles["font-family"] = fontFamily;
    }

    const fontSize = textStyle.getFontSize();

    if (fontSize !== 10) {
      styles["font-size"] = `${fontSize}px`;
    }

    const color = textStyle.getForegroundColor();

    if (color && !["#000000", "#000", "black"].includes(color)) {
      styles["color"] = color;
    }

    const href = run.getLinkUrl();

    let tag: string = "span";

    if (href) {
      tag = "a";
      attributes["href"] = href;
      // htmlAttributes["target"] = "_blank";
      // htmlAttributes["rel"] = "noopener noreferrer";
    } else if (tags.length > 0) {
      tag = tags.pop() ?? "span";
    }

    if (Object.keys(styles).length > 0) {
      attributes["style"] = _toStringStyles(styles);
    }

    html += Utilities.formatString(
      `<%s%s>%s%s%s</%s>`,
      tag,
      Object.keys(attributes).length > 0
        ? ` ${_toStringAttrs(attributes)}`
        : "",
      tags.length > 0 ? `<${tags.join("><")}>` : "",
      run.getText().replace(/\r?\n|\r/g, "<br>"),
      tags.length > 0 ? `</${tags.reverse().join("></")}>` : "",
      tag
    );
  }

  return html;
}
