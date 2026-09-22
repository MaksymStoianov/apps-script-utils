import { isEmpty, nonEmpty } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonEmpty", () => {
  describe("Correct input data", () => {
    it("should return true for non-empty collections and strings", () => {
      expect(nonEmpty([1])).toBe(true);
      expect(nonEmpty({ a: 1 })).toBe(true);
      expect(nonEmpty(new Set([1]))).toBe(true);
      expect(nonEmpty("abc")).toBe(true);
    });

    it("should return true for numbers and booleans, which are never empty", () => {
      expect(nonEmpty(0)).toBe(true);
      expect(nonEmpty(false)).toBe(true);
      expect(nonEmpty(NaN)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for nil values", () => {
      expect(nonEmpty(null)).toBe(false);
      expect(nonEmpty(undefined)).toBe(false);
    });

    it("should return false for empty collections", () => {
      expect(nonEmpty([])).toBe(false);
      expect(nonEmpty({})).toBe(false);
      expect(nonEmpty(new Set())).toBe(false);
      expect(nonEmpty(new Map())).toBe(false);
    });

    it("should return false for empty and whitespace-only strings", () => {
      expect(nonEmpty("")).toBe(false);
      expect(nonEmpty("   ")).toBe(false);
    });
  });

  describe("Agreement with isEmpty", () => {
    it("should be the exact inverse for every fixture", () => {
      const fixtures: unknown[] = [
        null,
        undefined,
        "",
        "   ",
        "a",
        0,
        false,
        [],
        [1],
        {},
        { a: 1 }
      ];

      for (const value of fixtures) {
        expect(nonEmpty(value)).toBe(!isEmpty(value));
      }
    });
  });
});
