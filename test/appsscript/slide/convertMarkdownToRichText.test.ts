import { convertMarkdownToRichText } from "@/appsscript";
import { IllegalArgumentException, InvalidStringException } from "@/exception";
import { describe, expect, it } from "vitest";

const BASE = {
  fontSize: 12,
  fontFamily: "Arial",
  foregroundColor: "#000000"
};

describe("convertMarkdownToRichText", () => {
  describe("Correct input data", () => {
    it("should return a single run for unformatted text", () => {
      expect(convertMarkdownToRichText("hello")).toStrictEqual([
        { text: "hello", style: { ...BASE } }
      ]);
    });

    it("should return an empty array for an empty string", () => {
      expect(convertMarkdownToRichText("")).toStrictEqual([]);
    });

    it("should split the surrounding text away from a bold span", () => {
      expect(convertMarkdownToRichText("a **b** c")).toStrictEqual([
        { text: "a ", style: { ...BASE } },
        { text: "b", style: { ...BASE, bold: true } },
        { text: " c", style: { ...BASE } }
      ]);
    });

    it("should recognise italic, strikethrough and code", () => {
      expect(convertMarkdownToRichText("*i*")).toStrictEqual([
        { text: "i", style: { ...BASE, italic: true } }
      ]);

      expect(convertMarkdownToRichText("~~s~~")).toStrictEqual([
        { text: "s", style: { ...BASE, strikethrough: true } }
      ]);

      expect(convertMarkdownToRichText("`c`")).toStrictEqual([
        {
          text: "c",
          style: {
            ...BASE,
            fontFamily: "Courier New",
            foregroundColor: "#EB5757",
            backgroundColor: "#F3F3F3"
          }
        }
      ]);
    });

    it("should carry the outer style into a nested span", () => {
      expect(convertMarkdownToRichText("**bold *both* **")).toStrictEqual([
        { text: "bold ", style: { ...BASE, bold: true } },
        { text: "both", style: { ...BASE, bold: true, italic: true } },
        { text: " ", style: { ...BASE, bold: true } }
      ]);
    });

    it("should not interpret markdown inside a code span", () => {
      expect(convertMarkdownToRichText("`a **b**`")).toStrictEqual([
        {
          text: "a **b**",
          style: {
            ...BASE,
            fontFamily: "Courier New",
            foregroundColor: "#EB5757",
            backgroundColor: "#F3F3F3"
          }
        }
      ]);
    });

    it("should turn a link into a styled run carrying the url", () => {
      expect(convertMarkdownToRichText("[t](https://example.com)")).toStrictEqual([
        {
          text: "t",
          style: {
            ...BASE,
            foregroundColor: "#1155CC",
            link: { url: "https://example.com" }
          }
        }
      ]);
    });

    it("should merge adjacent runs that share a style", () => {
      expect(convertMarkdownToRichText("**a****b**")).toStrictEqual([
        { text: "ab", style: { ...BASE, bold: true } }
      ]);
    });

    it("should apply the theme to the base style", () => {
      expect(
        convertMarkdownToRichText("x", {
          fontSize: 20,
          fontFamily: "Roboto",
          textColor: "#111111"
        })
      ).toStrictEqual([
        { text: "x", style: { fontSize: 20, fontFamily: "Roboto", foregroundColor: "#111111" } }
      ]);
    });

    it("should apply the theme to code and link spans", () => {
      expect(
        convertMarkdownToRichText("`c`", {
          codeTheme: {
            fontFamily: "Menlo",
            textColor: "#222222",
            backgroundColor: "#eeeeee"
          }
        })
      ).toStrictEqual([
        {
          text: "c",
          style: {
            ...BASE,
            fontFamily: "Menlo",
            foregroundColor: "#222222",
            backgroundColor: "#eeeeee"
          }
        }
      ]);

      expect(
        convertMarkdownToRichText("[t](https://example.com)", { linkColor: "#333333" })
      ).toStrictEqual([
        {
          text: "t",
          style: { ...BASE, foregroundColor: "#333333", link: { url: "https://example.com" } }
        }
      ]);
    });
  });

  // Every other entry point in the library rejects a missing or non-string
  // argument; this one returns an empty array instead. Tracked in #451.
  describe("Incorrect input data", () => {
    it("should throw an IllegalArgumentException when called without arguments", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText()).toThrow(IllegalArgumentException);
    });

    it("should throw an InvalidStringException for a nil value", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText(null)).toThrow(InvalidStringException);
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText(undefined)).toThrow(InvalidStringException);
    });

    it("should throw an InvalidStringException for a value of another type", () => {
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText(42)).toThrow(InvalidStringException);
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText(["**bold**"])).toThrow(InvalidStringException);
      // @ts-expect-error - testing invalid types
      expect(() => convertMarkdownToRichText({ text: "**bold**" })).toThrow(InvalidStringException);
    });
  });
});
