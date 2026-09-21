import { nonNumberLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNumberLike", () => {
  describe("Correct input data", () => {
    it("should return false for finite numbers", () => {
      expect(nonNumberLike(0)).toBe(false);
      expect(nonNumberLike(-42)).toBe(false);
      expect(nonNumberLike(3.14)).toBe(false);
    });

    it("should return false for numeric strings", () => {
      expect(nonNumberLike("0")).toBe(false);
      expect(nonNumberLike("-42")).toBe(false);
      expect(nonNumberLike("3.14")).toBe(false);
      expect(nonNumberLike("  7  ")).toBe(false);
      expect(nonNumberLike("1e3")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for NaN and infinities", () => {
      expect(nonNumberLike(NaN)).toBe(true);
      expect(nonNumberLike(Infinity)).toBe(true);
      expect(nonNumberLike(-Infinity)).toBe(true);
    });

    it("should return true for empty and whitespace-only strings", () => {
      expect(nonNumberLike("")).toBe(true);
      expect(nonNumberLike("   ")).toBe(true);
    });

    it("should return true for non-numeric strings", () => {
      expect(nonNumberLike("abc")).toBe(true);
      expect(nonNumberLike("42px")).toBe(true);
      expect(nonNumberLike("Infinity")).toBe(true);
    });

    it("should return true for other types", () => {
      expect(nonNumberLike(null)).toBe(true);
      expect(nonNumberLike(undefined)).toBe(true);
      expect(nonNumberLike(true)).toBe(true);
      expect(nonNumberLike([])).toBe(true);
      expect(nonNumberLike({})).toBe(true);
    });
  });
});
