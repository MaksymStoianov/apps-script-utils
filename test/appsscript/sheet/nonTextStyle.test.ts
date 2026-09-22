import { nonTextStyle } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** Apps Script service objects report their class name from `toString()`. */
const textStyleMock = { toString: (): string => "TextStyle" };

describe("nonTextStyle", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as TextStyle", () => {
      expect(nonTextStyle(textStyleMock)).toBe(false);
    });

    it("should return false when the object carries other members too", () => {
      expect(nonTextStyle({ ...textStyleMock, isBold: (): boolean => true })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a TextStyleBuilder, which is a different object", () => {
      expect(nonTextStyle({ toString: (): string => "TextStyleBuilder" })).toBe(true);
    });

    it("should return true for a RichTextValue, the neighbouring value type", () => {
      expect(nonTextStyle({ toString: (): string => "RichTextValue" })).toBe(true);
    });

    it("should return true for a differently-cased name", () => {
      expect(nonTextStyle({ toString: (): string => "textstyle" })).toBe(true);
    });

    it("should return true for a plain object", () => {
      expect(nonTextStyle({})).toBe(true);
      expect(nonTextStyle({ isBold: (): boolean => true })).toBe(true);
    });

    it("should return true for nil values, primitives and arrays", () => {
      expect(nonTextStyle(null)).toBe(true);
      expect(nonTextStyle(undefined)).toBe(true);
      expect(nonTextStyle("TextStyle")).toBe(true);
      expect(nonTextStyle([])).toBe(true);
    });
  });
});
