import { isFloat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isFloat", () => {
  describe("Correct input data", () => {
    it("should return true for numbers with a fractional part", () => {
      expect(isFloat(1.5)).toBe(true);
      expect(isFloat(-0.1)).toBe(true);
      expect(isFloat(0.000001)).toBe(true);
    });

    it("should return true for computed fractions", () => {
      expect(isFloat(1 / 3)).toBe(true);
      expect(isFloat(Math.PI)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for integers, including decimal literals without a fraction", () => {
      expect(isFloat(1)).toBe(false);
      expect(isFloat(1.0)).toBe(false);
      expect(isFloat(0)).toBe(false);
      expect(isFloat(-0)).toBe(false);
      expect(isFloat(-42)).toBe(false);
    });

    it("should return false for NaN and infinities", () => {
      expect(isFloat(NaN)).toBe(false);
      expect(isFloat(Infinity)).toBe(false);
      expect(isFloat(-Infinity)).toBe(false);
    });

    it("should return false for numeric strings and other types", () => {
      expect(isFloat("1.5")).toBe(false);
      expect(isFloat(null)).toBe(false);
      expect(isFloat(undefined)).toBe(false);
      expect(isFloat(true)).toBe(false);
      expect(isFloat([1.5])).toBe(false);
    });
  });
});
