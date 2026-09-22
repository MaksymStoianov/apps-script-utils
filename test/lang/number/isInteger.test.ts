import { isInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isInteger", () => {
  describe("Correct input data", () => {
    it("should accept whole numbers", () => {
      expect(isInteger(0)).toBe(true);
      expect(isInteger(1)).toBe(true);
      expect(isInteger(-42)).toBe(true);
      expect(isInteger(-0)).toBe(true);
    });

    it("should accept a decimal literal with no fractional part", () => {
      expect(isInteger(1.0)).toBe(true);
    });

    it("should accept values past the safe integer range", () => {
      expect(isInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(true);
      expect(isInteger(2 ** 53)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should reject fractions", () => {
      expect(isInteger(1.5)).toBe(false);
      expect(isInteger(-0.1)).toBe(false);
    });

    it("should reject NaN and the infinities", () => {
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(Infinity)).toBe(false);
      expect(isInteger(-Infinity)).toBe(false);
    });

    it("should reject numeric strings, bigints and other types", () => {
      expect(isInteger("42")).toBe(false);
      expect(isInteger(42n)).toBe(false);
      expect(isInteger(null)).toBe(false);
      expect(isInteger([42])).toBe(false);
    });
  });
});
