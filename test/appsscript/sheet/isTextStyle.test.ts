import { isTextStyle } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "TextStyle" };

describe("isTextStyle", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as TextStyle", () => {
      expect(isTextStyle(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isTextStyle({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isTextStyle({ toString: (): string => "TextStyleBuilder" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isTextStyle({ toString: (): string => "textstyle" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isTextStyle({})).toBe(false);
    });

    it("should reject the bare string TextStyle", () => {
      expect(isTextStyle("TextStyle")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isTextStyle(null)).toBe(false);
      expect(isTextStyle(undefined)).toBe(false);
      expect(isTextStyle(42)).toBe(false);
      expect(isTextStyle([])).toBe(false);
    });
  });
});
