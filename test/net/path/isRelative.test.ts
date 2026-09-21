import { isAbsolute, isRelative } from "@/net";
import { describe, expect, it } from "vitest";

describe("isRelative", () => {
  describe("Correct input data", () => {
    it("should return true for relative paths", () => {
      expect(isRelative("docs/readme.md")).toBe(true);
      expect(isRelative("./docs")).toBe(true);
      expect(isRelative("../docs")).toBe(true);
    });

    it("should treat an empty string as relative", () => {
      expect(isRelative("")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for absolute paths", () => {
      expect(isRelative("/var/log")).toBe(false);
      expect(isRelative("https://example.com")).toBe(false);
    });

    it("should return true for non-string input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(isRelative(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(isRelative(42)).toBe(true);
    });
  });

  describe("Complementarity with isAbsolute", () => {
    it("should be the exact inverse for every input", () => {
      const values = ["/var", "https://a.com", "docs", "./a", "", "   ", "mailto:a@b.co"];

      for (const value of values) {
        expect(isRelative(value)).toBe(!isAbsolute(value));
      }
    });
  });
});
