import { EmptyStringException } from "@/exception";
import { decodeHtml, encodeHtml } from "@/html";
import { describe, expect, it } from "vitest";

describe("decodeHtml", () => {
  describe("Correct input data", () => {
    it("should decode decimal references", () => {
      expect(decodeHtml("&#60;b&#62;")).toBe("<b>");
      expect(decodeHtml("&#38;")).toBe("&");
    });

    it("should decode hexadecimal references in either case", () => {
      expect(decodeHtml("&#x3C;b&#x3E;")).toBe("<b>");
      expect(decodeHtml("&#x3c;")).toBe("<");
    });

    it("should leave text without references untouched", () => {
      expect(decodeHtml("hello world")).toBe("hello world");
    });
  });

  describe("Named entities are out of scope", () => {
    it("should leave named entities as they are", () => {
      expect(decodeHtml("&amp;")).toBe("&amp;");
      expect(decodeHtml("&nbsp;")).toBe("&nbsp;");
    });
  });

  describe("Round trip with encodeHtml", () => {
    it("should recover the original for markup and high characters", () => {
      for (const value of ["<b>", "a & b", "a\u00A0b", "плюс <тег>"]) {
        expect(decodeHtml(encodeHtml(value))).toBe(value);
      }
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => decodeHtml("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => decodeHtml(null)).toThrow(EmptyStringException);
    });
  });
});
