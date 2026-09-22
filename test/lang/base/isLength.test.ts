import { isLength } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isLength", () => {
  describe("Correct input data", () => {
    it("should return true for valid array-like lengths", () => {
      expect(isLength(0)).toBe(true);
      expect(isLength(1)).toBe(true);
      expect(isLength(1000)).toBe(true);
    });

    it("should return true at the maximum safe integer", () => {
      expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
    });

    it("should return true for the length of a real array", () => {
      expect(isLength([1, 2, 3].length)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for negatives and fractions", () => {
      expect(isLength(-1)).toBe(false);
      expect(isLength(1.5)).toBe(false);
    });

    it("should return false past the safe integer ceiling", () => {
      expect(isLength(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
      expect(isLength(Infinity)).toBe(false);
    });

    it("should return false for NaN and non-numeric types", () => {
      expect(isLength(NaN)).toBe(false);
      expect(isLength("1")).toBe(false);
      expect(isLength(null)).toBe(false);
    });
  });
});
