import { isNumber } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNumber", () => {
  describe("Correct input data", () => {
    it("should return true for ordinary numbers", () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-1.5)).toBe(true);
      expect(isNumber(1e21)).toBe(true);
    });

    it("should return true for NaN and the infinities, which are numbers", () => {
      expect(isNumber(NaN)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
    });

    it("should return true for negative zero", () => {
      expect(isNumber(-0)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a boxed Number object", () => {
      expect(isNumber(new Number(1))).toBe(false);
    });

    it("should return false for bigints and numeric strings", () => {
      expect(isNumber(1n)).toBe(false);
      expect(isNumber("1")).toBe(false);
    });

    it("should return false for nil values and objects", () => {
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber([1])).toBe(false);
    });
  });
});
