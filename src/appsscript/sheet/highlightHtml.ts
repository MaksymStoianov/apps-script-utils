import { IllegalArgumentException } from "../../exception";
import { isEmpty, isNil, isString } from "../../lang";
import { requireRange } from "./requireRange";

interface Theme {
  text?: Font | null;
  tag?: Font | null;
  attrName?: Font | null;
  attrValue?: Font | null;
  comment?: Font | null;
}

interface Font {
  font?: string | null;
  size?: number | null;
  color?: string | null;
  style?: "normal" | "italic" | null;
  weight?: "normal" | "bold" | null;
  decoration?: "none" | "underline" | "line-through" | null;
}

const defaultTheme: Required<Theme> = {
  text: {
    font: "Arial",
    size: 10,
    color: "#000000",
    style: "normal",
    weight: "normal",
    decoration: "none"
  },
  tag: {
    font: "Arial",
    size: 10,
    color: "#8e004b",
    style: "normal",
    weight: "normal",
    decoration: "none"
  },
  attrName: {
    font: "Arial",
    size: 10,
    color: "#9f4311",
    style: "normal",
    weight: "normal",
    decoration: "none"
  },
  attrValue: {
    font: "Arial",
    size: 10,
    color: "#0742a0",
    style: "normal",
    weight: "normal",
    decoration: "none"
  },
  comment: {
    font: "Arial",
    size: 10,
    color: "#808080",
    style: "normal",
    weight: "normal",
    decoration: "none"
  }
};

/**
 * Applies HTML code formatting to Google Sheets cells, using a theme for colors and fonts.
 *
 * @example
 * ```javascript
 * const ss = SpreadsheetApp.getActiveSpreadsheet();
 * const sheet = ss.getSheetByName('Sheet1');
 * const range = sheet.getRange('A1:A5');
 * const theme = {
 *   text: {
 *     font: 'Open Sans',
 *     color: '#3c4043'
 *   },
 *   tag: {
 *     font: 'Open Sans',
 *     color: '#185abc'
 *   },
 *   attrName: {
 *     font: 'Open Sans',
 *     color: '#098591'
 *   },
 *   attrValue: {
 *     font: 'Open Sans',
 *     color: '#b31412'
 *   },
 *   comment: {
 *     font: 'Open Sans',
 *     color: '#137333'
 *   }
 * };
 *
 * highlightHtml(range, theme);
 * ```
 *
 * @param       {GoogleAppsScript.Spreadsheet.Range} range - The range of Google Sheets cells containing the HTML code to be formatted.
 * @param       {Theme} [theme] An object with theme settings, where you can specify fonts and colors for text, tags, and attributes.
 * @returns     {GoogleAppsScript.Spreadsheet.Range} The modified range, allowing for method chaining.
 * @throws      {@link IllegalArgumentException}
 * @see         {@link GoogleAppsScript.Spreadsheet.Range|Range}
 * @see         [Class Range](https://developers.google.com/apps-script/reference/spreadsheet/range)
 * @see         [Class Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
 * @since       1.0.0
 * @version     1.1.0
 * @environment `Google Apps Script`
 * @author      Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license     Apache-2.0
 */
export function highlightHtml(
  range: GoogleAppsScript.Spreadsheet.Range,
  theme: Theme | null | undefined = {}
): GoogleAppsScript.Spreadsheet.Range {
  if (arguments.length === 0) {
    throw new IllegalArgumentException();
  }

  requireRange(range);

  const effectiveTheme: Required<Theme> = {
    ...defaultTheme,
    ...theme,
    text: { ...defaultTheme.text, ...(theme?.text ?? {}) },
    tag: { ...defaultTheme.tag, ...(theme?.tag ?? {}) },
    attrName: { ...defaultTheme.attrName, ...(theme?.attrName ?? {}) },
    attrValue: { ...defaultTheme.attrValue, ...(theme?.attrValue ?? {}) },
    comment: { ...defaultTheme.comment, ...(theme?.comment ?? {}) }
  };

  const textStyles: Record<string, GoogleAppsScript.Spreadsheet.TextStyle> = {};

  for (const key in effectiveTheme) {
    if (!Object.prototype.hasOwnProperty.call(effectiveTheme, key)) {
      continue;
    }

    const fontProps: Font | null = effectiveTheme[key as keyof Theme];

    if (!fontProps) {
      continue;
    }

    const builder = SpreadsheetApp.newTextStyle();

    if (!isNil(fontProps.font)) {
      builder.setFontFamily(fontProps.font);
    }

    if (!isNil(fontProps.size)) {
      builder.setFontSize(fontProps.size);
    }

    if (!isNil(fontProps.color)) {
      builder.setForegroundColor(fontProps.color);
    }

    builder.setItalic(fontProps.style === "italic");
    builder.setBold(fontProps.weight === "bold");
    builder.setUnderline(fontProps.decoration === "underline");
    builder.setStrikethrough(fontProps.decoration === "line-through");

    textStyles[key] = builder.build();
  }

  const _convertHtmlTagsToRichText = (
    html: string,
    textStyles: Record<string, GoogleAppsScript.Spreadsheet.TextStyle>
  ): GoogleAppsScript.Spreadsheet.RichTextValue => {
    const richTextBuilder = SpreadsheetApp.newRichTextValue();

    if (!isString(html) || isEmpty(html.trim())) {
      return richTextBuilder.setText("").build();
    }

    richTextBuilder.setText(html);
    richTextBuilder.setTextStyle(0, html.length, textStyles.text);

    const tagRegex = /<!--[\s\S]*?-->|<\/?[a-z0-9]+|(\s+[a-z-]+)="([^"]*)"|>/gi;

    let match;

    while ((match = tagRegex.exec(html)) !== null) {
      const fullMatchText = match[0];

      const startIndex = match.index;

      if (fullMatchText.startsWith("<!--") && fullMatchText.endsWith("-->")) {
        richTextBuilder.setTextStyle(
          startIndex,
          startIndex + fullMatchText.length,
          textStyles.comment
        );
      } else if (
        fullMatchText.startsWith("<") ||
        fullMatchText.startsWith("</") ||
        fullMatchText.endsWith(">")
      ) {
        richTextBuilder.setTextStyle(
          match.index,
          match.index + fullMatchText.length,
          textStyles.tag
        );
      } else if (match[1]) {
        const attrNameEndIndex = match.index + match[1].length;

        const attrValueEndIndex = match.index + fullMatchText.length;

        richTextBuilder.setTextStyle(match.index, attrValueEndIndex, textStyles.attrName);

        const attrValueStartIndex = attrNameEndIndex + '="'.length;

        richTextBuilder.setTextStyle(
          attrValueStartIndex,
          attrValueEndIndex - 1,
          textStyles.attrValue
        );
      }
    }

    return richTextBuilder.build();
  };

  const richTextValues = range
    .getDisplayValues()
    .map((cells) => cells.map((cell) => _convertHtmlTagsToRichText(cell, textStyles)));

  if (range.getNumRows() === 1 && range.getNumColumns() === 1) {
    range.setRichTextValue(richTextValues[0][0]);
  } else {
    range.setRichTextValues(richTextValues);
  }

  return range;
}
