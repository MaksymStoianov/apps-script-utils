import { isAbsolute } from "@/net";
import { describe, expect, it } from "vitest";

describe("isAbsolute", () => {
  describe("Correct input data", () => {
    it("should return true for paths starting with a slash", () => {
      expect(isAbsolute("/")).toBe(true);
      expect(isAbsolute("/var/log")).toBe(true);
    });

    it("should return true for paths carrying a scheme", () => {
      expect(isAbsolute("https://example.com")).toBe(true);
      expect(isAbsolute("file:///tmp")).toBe(true);
      expect(isAbsolute("mailto:someone@example.com")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for relative paths", () => {
      expect(isAbsolute("docs/readme.md")).toBe(false);
      expect(isAbsolute("./docs")).toBe(false);
      expect(isAbsolute("../docs")).toBe(false);
      expect(isAbsolute("readme.md")).toBe(false);
    });

    it("should return false for an empty string rather than throwing", () => {
      expect(isAbsolute("")).toBe(false);
      expect(isAbsolute("   ")).toBe(false);
    });

    it("should return false for non-string input rather than throwing", () => {
      // @ts-expect-error - testing invalid types
      expect(isAbsolute(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isAbsolute(undefined)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isAbsolute(42)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isAbsolute(["/var"])).toBe(false);
    });
  });
});
