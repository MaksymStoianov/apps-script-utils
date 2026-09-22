import { nonSafeInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonSafeInteger", () => {
  describe("Correct input data", () => {
    it("should return true beyond the safe integer range", () => {
      expect(nonSafeInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(true);
      expect(nonSafeInteger(Number.MIN_SAFE_INTEGER - 2)).toBe(true);
      expect(nonSafeInteger(2 ** 53)).toBe(true);
    });

    it("should return true for numbers with a fractional part", () => {
      expect(nonSafeInteger(1.5)).toBe(true);
      expect(nonSafeInteger(-0.1)).toBe(true);
    });

    it("should return true for NaN and infinities", () => {
      expect(nonSafeInteger(NaN)).toBe(true);
      expect(nonSafeInteger(Infinity)).toBe(true);
      expect(nonSafeInteger(-Infinity)).toBe(true);
    });

    it("should return true for numeric strings and other types", () => {
      expect(nonSafeInteger("42")).toBe(true);
      expect(nonSafeInteger(null)).toBe(true);
      expect(nonSafeInteger(undefined)).toBe(true);
      expect(nonSafeInteger(42n)).toBe(true);
      expect(nonSafeInteger([42])).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for safe integers", () => {
      expect(nonSafeInteger(0)).toBe(false);
      expect(nonSafeInteger(42)).toBe(false);
      expect(nonSafeInteger(-42)).toBe(false);
      expect(nonSafeInteger(-0)).toBe(false);
      expect(nonSafeInteger(1.0)).toBe(false);
    });

    it("should return false at the bounds of the safe integer range", () => {
      expect(nonSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(false);
      expect(nonSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(false);
    });
  });
});
