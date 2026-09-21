import { nonInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonInteger", () => {
  describe("Correct input data", () => {
    it("should return false for integers", () => {
      expect(nonInteger(0)).toBe(false);
      expect(nonInteger(1)).toBe(false);
      expect(nonInteger(-42)).toBe(false);
      expect(nonInteger(-0)).toBe(false);
    });

    it("should return false for decimal literals without a fraction", () => {
      expect(nonInteger(1.0)).toBe(false);
    });

    it("should return false beyond the safe integer range", () => {
      expect(nonInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for numbers with a fractional part", () => {
      expect(nonInteger(1.5)).toBe(true);
      expect(nonInteger(-0.1)).toBe(true);
      expect(nonInteger(1 / 3)).toBe(true);
    });

    it("should return true for NaN and infinities", () => {
      expect(nonInteger(NaN)).toBe(true);
      expect(nonInteger(Infinity)).toBe(true);
      expect(nonInteger(-Infinity)).toBe(true);
    });

    it("should return true for numeric strings and other types", () => {
      expect(nonInteger("42")).toBe(true);
      expect(nonInteger(null)).toBe(true);
      expect(nonInteger(undefined)).toBe(true);
      expect(nonInteger(42n)).toBe(true);
      expect(nonInteger([42])).toBe(true);
    });
  });
});
