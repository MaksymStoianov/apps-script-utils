import { nonLength } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonLength", () => {
  describe("Correct input data", () => {
    it("should return false for valid array-like lengths", () => {
      expect(nonLength(0)).toBe(false);
      expect(nonLength(1)).toBe(false);
      expect(nonLength(1000)).toBe(false);
    });

    it("should return false for the maximum safe integer", () => {
      expect(nonLength(Number.MAX_SAFE_INTEGER)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for negative numbers", () => {
      expect(nonLength(-1)).toBe(true);
      expect(nonLength(-0.5)).toBe(true);
    });

    it("should return true for non-integer numbers", () => {
      expect(nonLength(1.5)).toBe(true);
      expect(nonLength(0.1)).toBe(true);
    });

    it("should return true for values above the maximum safe integer", () => {
      expect(nonLength(Number.MAX_SAFE_INTEGER + 2)).toBe(true);
      expect(nonLength(Infinity)).toBe(true);
    });

    it("should return true for NaN", () => {
      expect(nonLength(NaN)).toBe(true);
    });

    it("should return true for non-numeric types", () => {
      expect(nonLength("1")).toBe(true);
      expect(nonLength(null)).toBe(true);
      expect(nonLength(undefined)).toBe(true);
      expect(nonLength([])).toBe(true);
    });
  });
});
