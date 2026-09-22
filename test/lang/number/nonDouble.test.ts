import { isDouble, nonDouble } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonDouble", () => {
  describe("Correct input data", () => {
    it("should return true for integers", () => {
      expect(nonDouble(0)).toBe(true);
      expect(nonDouble(42)).toBe(true);
      expect(nonDouble(-42)).toBe(true);
    });

    it("should return true for decimal literals without a fraction", () => {
      expect(nonDouble(1.0)).toBe(true);
    });

    it("should return true for NaN and infinities", () => {
      expect(nonDouble(NaN)).toBe(true);
      expect(nonDouble(Infinity)).toBe(true);
      expect(nonDouble(-Infinity)).toBe(true);
    });

    it("should return true for non-numeric types", () => {
      expect(nonDouble("1.5")).toBe(true);
      expect(nonDouble(null)).toBe(true);
      expect(nonDouble(undefined)).toBe(true);
      expect(nonDouble(42n)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for numbers with a fractional part", () => {
      expect(nonDouble(1.5)).toBe(false);
      expect(nonDouble(-0.1)).toBe(false);
      expect(nonDouble(Number.MIN_VALUE)).toBe(false);
    });
  });

  describe("Synonymy", () => {
    it("should be the exact negation of isDouble", () => {
      const cases: unknown[] = [1.5, -0.1, 0, 42, 1.0, NaN, Infinity, "1.5", null, undefined, 42n];

      cases.forEach((value: unknown): void => {
        expect(nonDouble(value)).toBe(!isDouble(value));
      });
    });
  });
});
