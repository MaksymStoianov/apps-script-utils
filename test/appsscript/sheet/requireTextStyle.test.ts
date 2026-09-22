import { requireTextStyle } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/** Apps Script service objects report their class name from `toString()`. */
const textStyleMock = { toString: (): string => "TextStyle" };

describe("requireTextStyle", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      expect(requireTextStyle(textStyleMock)).toBe(textStyleMock);
    });

    it("should accept an object carrying other members", () => {
      const extended = { ...textStyleMock, isBold: (): boolean => true };

      expect(requireTextStyle(extended)).toBe(extended);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a TextStyleBuilder", () => {
      expect(() => requireTextStyle({ toString: (): string => "TextStyleBuilder" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for a RichTextValue", () => {
      expect(() => requireTextStyle({ toString: (): string => "RichTextValue" })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for plain objects, nil values and primitives", () => {
      expect(() => requireTextStyle({})).toThrow(IllegalArgumentException);
      expect(() => requireTextStyle(null)).toThrow(IllegalArgumentException);
      expect(() => requireTextStyle("TextStyle")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireTextStyle({})).toThrow("Expected a TextStyle object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireTextStyle({}, "Call build() on the builder first.")).toThrow(
        "Call build() on the builder first."
      );
    });
  });
});
