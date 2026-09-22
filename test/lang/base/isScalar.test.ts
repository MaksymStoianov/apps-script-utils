import { isScalar } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isScalar", () => {
  describe("Correct input data", () => {
    it("should return true for strings", () => {
      expect(isScalar("abc")).toBe(true);
      expect(isScalar("")).toBe(true);
    });

    it("should return true for numbers, including NaN and infinities", () => {
      expect(isScalar(0)).toBe(true);
      expect(isScalar(-1.5)).toBe(true);
      expect(isScalar(NaN)).toBe(true);
      expect(isScalar(Infinity)).toBe(true);
    });

    it("should return true for booleans", () => {
      expect(isScalar(true)).toBe(true);
      expect(isScalar(false)).toBe(true);
    });

    it("should return true for symbols", () => {
      expect(isScalar(Symbol("s"))).toBe(true);
      expect(isScalar(Symbol.iterator)).toBe(true);
    });

    it("should return true for bigints", () => {
      expect(isScalar(0n)).toBe(true);
      expect(isScalar(9007199254740993n)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for nil values", () => {
      expect(isScalar(null)).toBe(false);
      expect(isScalar(undefined)).toBe(false);
    });

    it("should return false for objects, arrays and functions", () => {
      expect(isScalar({})).toBe(false);
      expect(isScalar([])).toBe(false);
      expect(isScalar(new Date())).toBe(false);
      expect(isScalar(() => {})).toBe(false);
    });

    it("should return false for boxed primitives", () => {
      // eslint-disable-next-line no-new-wrappers
      expect(isScalar(new String("abc"))).toBe(false);
      // eslint-disable-next-line no-new-wrappers
      expect(isScalar(new Number(1))).toBe(false);
    });
  });
});
