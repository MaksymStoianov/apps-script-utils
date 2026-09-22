import { isNonNegative, nonNegative } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNonNegative", () => {
  describe("Correct input data", () => {
    it("should return true for zero and positive numbers", () => {
      expect(isNonNegative(0)).toBe(true);
      expect(isNonNegative(1)).toBe(true);
      expect(isNonNegative(3.14)).toBe(true);
    });

    it("should return true for negative zero", () => {
      expect(isNonNegative(-0)).toBe(true);
    });

    it("should return true for positive infinity", () => {
      expect(isNonNegative(Infinity)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for negative numbers", () => {
      expect(isNonNegative(-1)).toBe(false);
      expect(isNonNegative(-0.1)).toBe(false);
      expect(isNonNegative(-Infinity)).toBe(false);
    });

    it("should return false for NaN, which is neither negative nor not", () => {
      expect(isNonNegative(NaN)).toBe(false);
    });

    it("should return false for numeric strings and other types", () => {
      expect(isNonNegative("1")).toBe(false);
      expect(isNonNegative(null)).toBe(false);
      expect(isNonNegative(undefined)).toBe(false);
      expect(isNonNegative(true)).toBe(false);
      expect(isNonNegative(1n)).toBe(false);
    });
  });

  describe("Deprecated nonNegative alias", () => {
    it("should behave identically to isNonNegative", () => {
      for (const value of [0, -0, 1, -1, NaN, Infinity, -Infinity, "1", null, undefined]) {
        expect(nonNegative(value)).toBe(isNonNegative(value));
      }
    });
  });
});
