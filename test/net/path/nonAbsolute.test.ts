import { isRelative, nonAbsolute } from "@/net";
import { describe, expect, it } from "vitest";

describe("nonAbsolute", () => {
  describe("Correct input data", () => {
    it("should return false for paths starting with a slash", () => {
      expect(nonAbsolute("/")).toBe(false);
      expect(nonAbsolute("/var/log")).toBe(false);
    });

    it("should return false for paths carrying a scheme", () => {
      expect(nonAbsolute("https://example.com")).toBe(false);
      expect(nonAbsolute("mailto:someone@example.com")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for relative paths", () => {
      expect(nonAbsolute("docs/readme.md")).toBe(true);
      expect(nonAbsolute("./docs")).toBe(true);
      expect(nonAbsolute("../docs")).toBe(true);
    });

    it("should return true for an empty string rather than throwing", () => {
      expect(nonAbsolute("")).toBe(true);
      expect(nonAbsolute("   ")).toBe(true);
    });

    it("should return true for non-string input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(nonAbsolute(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonAbsolute(42)).toBe(true);
    });
  });

  describe("Relationship to isRelative", () => {
    it("should agree with isRelative for every input", () => {
      const values = ["/var", "https://a.com", "docs", "./a", "", "mailto:a@b.co"];

      for (const value of values) {
        expect(nonAbsolute(value)).toBe(isRelative(value));
      }
    });
  });
});
