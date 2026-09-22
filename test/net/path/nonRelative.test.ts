import { isAbsolute, nonRelative } from "@/net";
import { describe, expect, it } from "vitest";

describe("nonRelative", () => {
  describe("Correct input data", () => {
    it("should return true for paths starting with a slash", () => {
      expect(nonRelative("/")).toBe(true);
      expect(nonRelative("/var/log")).toBe(true);
    });

    it("should return true for paths carrying a scheme", () => {
      expect(nonRelative("https://example.com")).toBe(true);
      expect(nonRelative("file:///tmp")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for relative paths", () => {
      expect(nonRelative("docs/readme.md")).toBe(false);
      expect(nonRelative("./docs")).toBe(false);
      expect(nonRelative("../docs")).toBe(false);
    });

    it("should return false for an empty string, which counts as relative", () => {
      expect(nonRelative("")).toBe(false);
      expect(nonRelative("   ")).toBe(false);
    });

    it("should return false for non-string input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(nonRelative(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(nonRelative(42)).toBe(false);
    });
  });

  describe("Relationship to isAbsolute", () => {
    it("should agree with isAbsolute for every input", () => {
      const values = ["/var", "https://a.com", "docs", "./a", "", "mailto:a@b.co"];

      for (const value of values) {
        expect(nonRelative(value)).toBe(isAbsolute(value));
      }
    });
  });
});
