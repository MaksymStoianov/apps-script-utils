import { isValidLocale } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isValidLocale", () => {
  describe("Correct input data", () => {
    it("should accept two-letter language codes", () => {
      expect(isValidLocale("en")).toBe(true);
      expect(isValidLocale("uk")).toBe(true);
    });

    it("should accept either case", () => {
      expect(isValidLocale("EN")).toBe(true);
      expect(isValidLocale("Uk")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject malformed input", () => {
      expect(isValidLocale("e")).toBe(false);
      expect(isValidLocale("en1")).toBe(false);
      expect(isValidLocale("e n")).toBe(false);
    });

    it("should reject empty and whitespace-only strings", () => {
      expect(isValidLocale("")).toBe(false);
      expect(isValidLocale("  ")).toBe(false);
    });

    it("should reject non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(isValidLocale(null)).toBe(false);
      // @ts-expect-error - testing invalid types
      expect(isValidLocale(42)).toBe(false);
    });
  });

  // The pattern accepts a bare language code only. Tracked in #363; these
  // assertions change if it is widened.
  describe("Known limitation: region and script subtags are rejected", () => {
    it("should currently reject the forms real locales take", () => {
      expect(isValidLocale("en-US")).toBe(false);
      expect(isValidLocale("zh-Hant")).toBe(false);
      expect(isValidLocale("fil")).toBe(false);
    });
  });
});
