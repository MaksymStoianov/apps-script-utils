import { convertRichTextToHtml } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type Mutable = Record<string, unknown>;

interface RunSpec {
  text: string;
  url?: string | null;
  strikethrough?: boolean;
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;
  fontFamily?: string;
  fontSize?: number | null;
  color?: string | null;
}

/**
 * Builds a stand-in for `RichTextValue`. `isRichTextValue` identifies the real
 * object by its string tag, so the tag is what makes this pass the guard.
 */
function richTextMock(runs: RunSpec[]): GoogleAppsScript.Spreadsheet.RichTextValue {
  return {
    toString: () => "RichTextValue",
    getRuns: () =>
      runs.map((run) => ({
        getText: () => run.text,
        getLinkUrl: () => run.url ?? null,
        getTextStyle: () => ({
          isStrikethrough: () => run.strikethrough ?? false,
          isUnderline: () => run.underline ?? false,
          isBold: () => run.bold ?? false,
          isItalic: () => run.italic ?? false,
          getFontFamily: () => run.fontFamily ?? "Arial",
          getFontSize: () => (run.fontSize === undefined ? 10 : run.fontSize),
          getForegroundColor: () => (run.color === undefined ? "#000000" : run.color)
        })
      }))
  } as unknown as GoogleAppsScript.Spreadsheet.RichTextValue;
}

describe("convertRichTextToHtml", () => {
  beforeEach(() => {
    (globalThis as Mutable).Utilities = {
      formatString: (format: string, ...args: unknown[]): string => {
        let index = 0;

        return format.replace(/%s/g, () => String(args[index++]));
      }
    };
  });

  afterEach(() => {
    delete (globalThis as Mutable).Utilities;
  });

  describe("Correct input data", () => {
    it("should wrap unformatted text in a span", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "hi" }]))).toBe("<span>hi</span>");
    });

    it("should return an empty string when there are no runs", () => {
      expect(convertRichTextToHtml(richTextMock([]))).toBe("");
    });

    it("should emit a tag per formatting flag", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "x", bold: true }]))).toBe("<b>x</b>");
      expect(convertRichTextToHtml(richTextMock([{ text: "x", italic: true }]))).toBe("<i>x</i>");
      expect(convertRichTextToHtml(richTextMock([{ text: "x", underline: true }]))).toBe(
        "<u>x</u>"
      );
      expect(convertRichTextToHtml(richTextMock([{ text: "x", strikethrough: true }]))).toBe(
        "<s>x</s>"
      );
    });

    it("should nest the tags when several flags are set", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "x", bold: true, italic: true }]))).toBe(
        "<i><b>x</b></i>"
      );

      expect(
        convertRichTextToHtml(
          richTextMock([
            { text: "x", bold: true, italic: true, underline: true, strikethrough: true }
          ])
        )
      ).toBe("<i><s><u><b>x</b></u></s></i>");
    });

    it("should render a run with a link as an anchor", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "g", url: "https://example.com" }]))).toBe(
        '<a href="https://example.com">g</a>'
      );
    });

    it("should keep the formatting tags inside the anchor", () => {
      expect(
        convertRichTextToHtml(richTextMock([{ text: "g", url: "https://example.com", bold: true }]))
      ).toBe('<a href="https://example.com"><b>g</b></a>');
    });

    it("should emit only the styles that differ from the defaults", () => {
      expect(
        convertRichTextToHtml(
          richTextMock([{ text: "x", fontFamily: "Roboto", fontSize: 14, color: "#ff0000" }])
        )
      ).toBe('<span style="font-family: Roboto; font-size: 14px; color: #ff0000">x</span>');
    });

    it("should omit the default font, size and colour", () => {
      expect(
        convertRichTextToHtml(
          richTextMock([{ text: "x", fontFamily: "Arial", fontSize: 10, color: "#000000" }])
        )
      ).toBe("<span>x</span>");
    });

    it("should omit the size when the run has no explicit size", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "x", fontSize: null }]))).toBe(
        "<span>x</span>"
      );

      expect(convertRichTextToHtml(richTextMock([{ text: "x", fontSize: null, bold: true }]))).toBe(
        "<b>x</b>"
      );
    });

    it("should replace the line breaks with br", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "a\nb\r\nc\rd" }]))).toBe(
        "<span>a<br>b<br>c<br>d</span>"
      );
    });

    it("should concatenate the runs in order", () => {
      expect(convertRichTextToHtml(richTextMock([{ text: "a" }, { text: "b", bold: true }]))).toBe(
        "<span>a</span><b>b</b>"
      );
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToHtml()).toThrow(IllegalArgumentException);
    });

    it("should throw when the value is not a RichTextValue", () => {
      for (const value of [null, undefined, 0, "", "RichTextValue", [], {}, () => {}]) {
        // @ts-expect-error - testing invalid types
        expect(() => convertRichTextToHtml(value)).toThrow(TypeError);
      }
    });
  });
});
