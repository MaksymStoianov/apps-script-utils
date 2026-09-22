import { nonFloat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonFloat", () => {
  describe("Correct input data", () => {
    it("should return true for integers", () => {
      expect(nonFloat(0)).toBe(true);
      expect(nonFloat(42)).toBe(true);
      expect(nonFloat(-42)).toBe(true);
      expect(nonFloat(-0)).toBe(true);
    });

    it("should return true for decimal literals without a fraction", () => {
      expect(nonFloat(1.0)).toBe(true);
    });

    it("should return true for NaN and infinities", () => {
      expect(nonFloat(NaN)).toBe(true);
      expect(nonFloat(Infinity)).toBe(true);
      expect(nonFloat(-Infinity)).toBe(true);
    });

    it("should return true for numeric strings and other types", () => {
      expect(nonFloat("1.5")).toBe(true);
      expect(nonFloat(null)).toBe(true);
      expect(nonFloat(undefined)).toBe(true);
      expect(nonFloat(42n)).toBe(true);
      expect(nonFloat([1.5])).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for numbers with a fractional part", () => {
      expect(nonFloat(1.5)).toBe(false);
      expect(nonFloat(-0.1)).toBe(false);
      expect(nonFloat(1 / 3)).toBe(false);
      expect(nonFloat(Number.MIN_VALUE)).toBe(false);
    });
  });
});
