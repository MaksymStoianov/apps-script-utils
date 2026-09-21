import { nonCountable } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonCountable", () => {
  describe("Correct input data", () => {
    it("should return false for non-negative safe integers", () => {
      expect(nonCountable(0)).toBe(false);
      expect(nonCountable(1)).toBe(false);
      expect(nonCountable(1000)).toBe(false);
      expect(nonCountable(Number.MAX_SAFE_INTEGER)).toBe(false);
    });

    it("should return false for negative zero", () => {
      expect(nonCountable(-0)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for negative numbers", () => {
      expect(nonCountable(-1)).toBe(true);
      expect(nonCountable(-0.5)).toBe(true);
    });

    it("should return true for fractions", () => {
      expect(nonCountable(1.5)).toBe(true);
      expect(nonCountable(0.1)).toBe(true);
    });

    it("should return true beyond the safe integer range", () => {
      expect(nonCountable(Number.MAX_SAFE_INTEGER + 2)).toBe(true);
      expect(nonCountable(Infinity)).toBe(true);
    });

    it("should return true for NaN", () => {
      expect(nonCountable(NaN)).toBe(true);
    });

    it("should return true for numeric strings and other types", () => {
      expect(nonCountable("1")).toBe(true);
      expect(nonCountable(null)).toBe(true);
      expect(nonCountable(undefined)).toBe(true);
      expect(nonCountable(1n)).toBe(true);
      expect(nonCountable([1])).toBe(true);
    });
  });
});
