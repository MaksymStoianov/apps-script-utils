import { nonRange } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Range" };

describe("nonRange", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as Range", () => {
      expect(nonRange(match)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a different service object", () => {
      expect(nonRange({ toString: (): string => "Sheet" })).toBe(true);
    });

    it("should return true for a plain object and the bare string", () => {
      expect(nonRange({})).toBe(true);
      expect(nonRange("Range")).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonRange(null)).toBe(true);
      expect(nonRange(undefined)).toBe(true);
      expect(nonRange(42)).toBe(true);
    });
  });
});
