import { isDouble, isFloat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isDouble", () => {
  describe("Correct input data", () => {
    it("should return true for numbers with a fractional part", () => {
      expect(isDouble(1.5)).toBe(true);
      expect(isDouble(-0.1)).toBe(true);
      expect(isDouble(1 / 3)).toBe(true);
      expect(isDouble(Number.MIN_VALUE)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for integers", () => {
      expect(isDouble(0)).toBe(false);
      expect(isDouble(42)).toBe(false);
      expect(isDouble(-42)).toBe(false);
    });

    it("should return false for decimal literals without a fraction", () => {
      expect(isDouble(1.0)).toBe(false);
    });

    it("should return false for NaN and infinities", () => {
      expect(isDouble(NaN)).toBe(false);
      expect(isDouble(Infinity)).toBe(false);
      expect(isDouble(-Infinity)).toBe(false);
    });

    it("should return false for non-numeric types", () => {
      expect(isDouble("1.5")).toBe(false);
      expect(isDouble(null)).toBe(false);
      expect(isDouble(undefined)).toBe(false);
      expect(isDouble(42n)).toBe(false);
      expect(isDouble([1.5])).toBe(false);
    });
  });

  describe("Synonymy", () => {
    it("should agree with isFloat on every case", () => {
      const cases: unknown[] = [1.5, -0.1, 0, 42, 1.0, NaN, Infinity, "1.5", null, undefined, 42n];

      cases.forEach((value: unknown): void => {
        expect(isDouble(value)).toBe(isFloat(value));
      });
    });
  });
});
