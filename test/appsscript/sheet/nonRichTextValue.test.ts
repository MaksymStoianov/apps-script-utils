import { nonRichTextValue } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** Apps Script service objects report their class name from `toString()`. */
const richTextMock = { toString: (): string => "RichTextValue" };

describe("nonRichTextValue", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as RichTextValue", () => {
      expect(nonRichTextValue(richTextMock)).toBe(false);
    });

    it("should return false when the object carries other members too", () => {
      expect(nonRichTextValue({ ...richTextMock, getText: (): string => "" })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a plain string, which a cell may hold instead", () => {
      expect(nonRichTextValue("plain text")).toBe(true);
    });

    it("should return true for a TextStyle, the neighbouring value type", () => {
      expect(nonRichTextValue({ toString: (): string => "TextStyle" })).toBe(true);
    });

    it("should return true for a differently-cased name", () => {
      expect(nonRichTextValue({ toString: (): string => "richtextvalue" })).toBe(true);
    });

    it("should return true for a plain object", () => {
      expect(nonRichTextValue({})).toBe(true);
      expect(nonRichTextValue({ getText: (): string => "" })).toBe(true);
    });

    it("should return true for nil values, primitives and arrays", () => {
      expect(nonRichTextValue(null)).toBe(true);
      expect(nonRichTextValue(undefined)).toBe(true);
      expect(nonRichTextValue(42)).toBe(true);
      expect(nonRichTextValue([])).toBe(true);
    });
  });
});
