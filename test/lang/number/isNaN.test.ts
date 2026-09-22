import { isNaN } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isNaN", () => {
  describe("Correct input data", () => {
    it("should return true for the NaN literal", () => {
      expect(isNaN(NaN)).toBe(true);
      expect(isNaN(Number.NaN)).toBe(true);
    });

    it("should return true for computations that produce NaN", () => {
      expect(isNaN(0 / 0)).toBe(true);
      expect(isNaN(Number("abc"))).toBe(true);
      expect(isNaN(Math.sqrt(-1))).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for ordinary numbers", () => {
      expect(isNaN(0)).toBe(false);
      expect(isNaN(-1.5)).toBe(false);
      expect(isNaN(Infinity)).toBe(false);
    });

    it("should not coerce its argument, unlike the global isNaN", () => {
      expect(isNaN("abc")).toBe(false);
      expect(isNaN(undefined)).toBe(false);
      expect(isNaN({})).toBe(false);
    });

    it("should return false for values the global isNaN also rejects", () => {
      expect(isNaN(null)).toBe(false);
      expect(isNaN("")).toBe(false);
      expect(isNaN("42")).toBe(false);
      expect(isNaN([])).toBe(false);
      expect(isNaN(true)).toBe(false);
    });
  });
});
