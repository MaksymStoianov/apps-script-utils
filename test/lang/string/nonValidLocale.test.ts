import { nonValidLocale } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonValidLocale", () => {
  describe("Correct input data", () => {
    it("should return false for two-letter language codes", () => {
      expect(nonValidLocale("en")).toBe(false);
      expect(nonValidLocale("uk")).toBe(false);
      expect(nonValidLocale("de")).toBe(false);
    });

    it("should return false regardless of case", () => {
      expect(nonValidLocale("EN")).toBe(false);
      expect(nonValidLocale("Uk")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    // Inherited from isValidLocale, which accepts a bare language code only.
    // These assertions change if the pattern is widened — see issue #363.
    it("should return true for tags carrying a region subtag", () => {
      expect(nonValidLocale("en-US")).toBe(true);
      expect(nonValidLocale("uk-UA")).toBe(true);
      expect(nonValidLocale("pt-BR")).toBe(true);
    });

    it("should return true for tags carrying a script subtag", () => {
      expect(nonValidLocale("zh-Hant")).toBe(true);
      expect(nonValidLocale("sr-Latn-RS")).toBe(true);
    });

    it("should return true for three-letter language codes", () => {
      expect(nonValidLocale("fil")).toBe(true);
    });

    it("should return true for malformed input", () => {
      expect(nonValidLocale("e")).toBe(true);
      expect(nonValidLocale("en1")).toBe(true);
      expect(nonValidLocale("e n")).toBe(true);
    });

    it("should return true for empty and whitespace-only strings", () => {
      expect(nonValidLocale("")).toBe(true);
      expect(nonValidLocale("  ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(nonValidLocale(null)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidLocale(undefined)).toBe(true);
      // @ts-expect-error - testing invalid types
      expect(nonValidLocale(42)).toBe(true);
    });
  });
});
