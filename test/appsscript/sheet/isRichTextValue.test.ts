import { isRichTextValue } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "RichTextValue" };

describe("isRichTextValue", () => {
  describe("Correct input data", () => {
    it("should accept an object reporting itself as RichTextValue", () => {
      expect(isRichTextValue(match)).toBe(true);
    });

    it("should accept it with other members present", () => {
      expect(isRichTextValue({ ...match, extra: (): number => 1 })).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject a different service object", () => {
      expect(isRichTextValue({ toString: (): string => "TextStyle" })).toBe(false);
    });

    it("should reject a differently-cased name", () => {
      expect(isRichTextValue({ toString: (): string => "richtextvalue" })).toBe(false);
    });

    it("should reject a plain object, whose tag is [object Object]", () => {
      expect(isRichTextValue({})).toBe(false);
    });

    it("should reject the bare string RichTextValue", () => {
      expect(isRichTextValue("RichTextValue")).toBe(false);
    });

    it("should reject nil values, primitives and arrays", () => {
      expect(isRichTextValue(null)).toBe(false);
      expect(isRichTextValue(undefined)).toBe(false);
      expect(isRichTextValue(42)).toBe(false);
      expect(isRichTextValue([])).toBe(false);
    });
  });
});
