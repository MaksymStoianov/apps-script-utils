import { nonNaN } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNaN", () => {
  describe("Correct input data", () => {
    it("should return true for ordinary numbers", () => {
      expect(nonNaN(0)).toBe(true);
      expect(nonNaN(42)).toBe(true);
      expect(nonNaN(-1.5)).toBe(true);
    });

    it("should return true for the infinities", () => {
      expect(nonNaN(Infinity)).toBe(true);
      expect(nonNaN(-Infinity)).toBe(true);
    });

    it("should return true for values the global isNaN coerces first", () => {
      expect(nonNaN("abc")).toBe(true);
      expect(nonNaN(undefined)).toBe(true);
      expect(nonNaN({})).toBe(true);
    });

    it("should return true for other types", () => {
      expect(nonNaN(null)).toBe(true);
      expect(nonNaN("NaN")).toBe(true);
      expect(nonNaN(42n)).toBe(true);
      expect(nonNaN([])).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for the NaN number", () => {
      expect(nonNaN(NaN)).toBe(false);
      expect(nonNaN(0 / 0)).toBe(false);
      expect(nonNaN(Number("abc"))).toBe(false);
      expect(nonNaN(Number.NaN)).toBe(false);
    });
  });
});
