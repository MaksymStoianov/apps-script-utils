import { EmptyStringException } from "@/exception";
import { encodeHtml } from "@/html";
import { describe, expect, it } from "vitest";

describe("encodeHtml", () => {
  describe("Correct input data", () => {
    it("should encode markup characters as numeric references", () => {
      expect(encodeHtml("<b>")).toBe("&#60;b&#62;");
    });

    it("should encode an ampersand", () => {
      expect(encodeHtml("a & b")).toBe("a &#38; b");
    });

    it("should encode characters above the ASCII range", () => {
      expect(encodeHtml("a\u00A0b")).toBe("a&#160;b");
    });

    it("should leave plain ASCII text untouched", () => {
      expect(encodeHtml("abc")).toBe("abc");
      expect(encodeHtml("hello world 123")).toBe("hello world 123");
    });

    it("should leave an existing numeric reference alone", () => {
      expect(encodeHtml("&#60;")).toBe("&#60;");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => encodeHtml("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => encodeHtml(null)).toThrow(EmptyStringException);
    });
  });
});
