import { isNumberLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNumberLike", () => {
  describe("Correct input data", () => {
    it("should return true for finite numbers", () => {
      expect(isNumberLike(0)).toBe(true);
      expect(isNumberLike(-42)).toBe(true);
      expect(isNumberLike(3.14)).toBe(true);
    });

    it("should return true for numeric strings", () => {
      expect(isNumberLike("0")).toBe(true);
      expect(isNumberLike("-3.14")).toBe(true);
      expect(isNumberLike("  7  ")).toBe(true);
      expect(isNumberLike("1e3")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for NaN and the infinities", () => {
      expect(isNumberLike(NaN)).toBe(false);
      expect(isNumberLike(Infinity)).toBe(false);
      expect(isNumberLike(-Infinity)).toBe(false);
    });

    it("should return false for empty and whitespace-only strings", () => {
      expect(isNumberLike("")).toBe(false);
      expect(isNumberLike("   ")).toBe(false);
    });

    it("should return false for partially numeric strings", () => {
      expect(isNumberLike("42px")).toBe(false);
      expect(isNumberLike("Infinity")).toBe(false);
    });

    it("should return false for nil values, booleans and containers", () => {
      expect(isNumberLike(null)).toBe(false);
      expect(isNumberLike(undefined)).toBe(false);
      expect(isNumberLike(true)).toBe(false);
      expect(isNumberLike([])).toBe(false);
      expect(isNumberLike({})).toBe(false);
    });
  });
});
