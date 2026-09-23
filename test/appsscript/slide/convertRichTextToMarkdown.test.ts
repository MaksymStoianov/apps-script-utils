import { convertMarkdownToRichText, convertRichTextToMarkdown } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

const BASE = {
  fontSize: 12,
  fontFamily: "Arial",
  foregroundColor: "#000000"
};

const CODE = {
  ...BASE,
  fontFamily: "Courier New",
  foregroundColor: "#EB5757",
  backgroundColor: "#F3F3F3"
};

describe("convertRichTextToMarkdown", () => {
  describe("Correct input data", () => {
    it("should return an empty string for an empty array", () => {
      expect(convertRichTextToMarkdown([])).toBe("");
    });

    it("should return the text of an unstyled run unchanged", () => {
      expect(convertRichTextToMarkdown([{ text: "hello", style: { ...BASE } }])).toBe("hello");
    });

    it("should wrap a bold run in double asterisks", () => {
      expect(convertRichTextToMarkdown([{ text: "b", style: { ...BASE, bold: true } }])).toBe(
        "**b**"
      );
    });

    it("should wrap an italic run in single asterisks", () => {
      expect(convertRichTextToMarkdown([{ text: "i", style: { ...BASE, italic: true } }])).toBe(
        "*i*"
      );
    });

    it("should wrap a strikethrough run in double tildes", () => {
      expect(
        convertRichTextToMarkdown([{ text: "s", style: { ...BASE, strikethrough: true } }])
      ).toBe("~~s~~");
    });

    it("should wrap a run styled with the code font in backticks", () => {
      expect(convertRichTextToMarkdown([{ text: "c", style: { ...CODE } }])).toBe("`c`");
    });

    it("should recognise the code font of a custom theme", () => {
      const theme = { codeTheme: { fontFamily: "Roboto Mono" } };

      expect(
        convertRichTextToMarkdown(
          [{ text: "c", style: { ...BASE, fontFamily: "Roboto Mono" } }],
          theme
        )
      ).toBe("`c`");
    });

    it("should write a run carrying a link as a Markdown link", () => {
      expect(
        convertRichTextToMarkdown([
          { text: "site", style: { ...BASE, link: { url: "https://example.com" } } }
        ])
      ).toBe("[site](https://example.com)");
    });

    it("should keep the link outside the styling of its text", () => {
      expect(
        convertRichTextToMarkdown([
          { text: "site", style: { ...BASE, bold: true, link: { url: "https://example.com" } } }
        ])
      ).toBe("[**site**](https://example.com)");
    });

    it("should join the runs in order", () => {
      expect(
        convertRichTextToMarkdown([
          { text: "a ", style: { ...BASE } },
          { text: "b", style: { ...BASE, bold: true } },
          { text: " c", style: { ...BASE } }
        ])
      ).toBe("a **b** c");
    });

    it("should skip a run with no text", () => {
      expect(
        convertRichTextToMarkdown([
          { text: "", style: { ...BASE, bold: true } },
          { text: "a", style: { ...BASE } }
        ])
      ).toBe("a");
    });

    it("should ignore a run without a style", () => {
      // @ts-expect-error - a run written by hand may carry no style
      expect(convertRichTextToMarkdown([{ text: "a" }])).toBe("a");
    });
  });

  describe("Round trip", () => {
    const cases = [
      "hello",
      "a **b** c",
      "*italic* text",
      "~~gone~~ text",
      "**bold** and `code`",
      "see [the site](https://example.com) for more"
    ];

    for (const text of cases) {
      it(`should return the original text for ${JSON.stringify(text)}`, () => {
        expect(convertRichTextToMarkdown(convertMarkdownToRichText(text))).toBe(text);
      });
    }
  });

  describe("Incorrect input data", () => {
    it("should throw an IllegalArgumentException when called without arguments", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown()).toThrow(IllegalArgumentException);
    });

    it("should throw an IllegalArgumentException for a value that is not an array", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown(null)).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown("**bold**")).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown({ text: "a" })).toThrow(IllegalArgumentException);
    });

    it("should throw an IllegalArgumentException for an element that is not a run", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown(["a"])).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => convertRichTextToMarkdown([{ style: { bold: true } }])).toThrow(
        IllegalArgumentException
      );
    });
  });
});
