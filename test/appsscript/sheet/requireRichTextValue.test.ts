import { requireRichTextValue } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** Apps Script service objects report their class name from `toString()`. */
const richTextMock = { toString: (): string => "RichTextValue" };

describe("requireRichTextValue", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireRichTextValue(richTextMock)).toBe(richTextMock);
    });

    it("should accept an object carrying other members", () => {
      const extended = { ...richTextMock, getText: (): string => "" };

      expect(requireRichTextValue(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a plain string, which a cell may hold instead", () => {
      expect(() => requireRichTextValue("plain text")).toThrow(IllegalArgumentException);
    });

    it("should throw for a TextStyle", () => {
      expect(() => requireRichTextValue({ toString: (): string => "TextStyle" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for plain objects, nil values and primitives", () => {
      expect(() => requireRichTextValue({})).toThrow(IllegalArgumentException);
      expect(() => requireRichTextValue(null)).toThrow(IllegalArgumentException);
      expect(() => requireRichTextValue(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireRichTextValue(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireRichTextValue("plain text")).toThrow("Expected a RichTextValue object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireRichTextValue("plain text", "Call getRichTextValue first.")).toThrow(
        "Call getRichTextValue first."
      );
    });
  });
});
