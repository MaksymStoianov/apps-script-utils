import { isSafeInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isSafeInteger", () => {
  describe("Correct input data", () => {
    it("should return true for ordinary integers", () => {
      expect(isSafeInteger(0)).toBe(true);
      expect(isSafeInteger(1)).toBe(true);
      expect(isSafeInteger(-42)).toBe(true);
    });

    it("should return true at the bounds of the safe range", () => {
      expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
    });

    it("should return true for negative zero", () => {
      expect(isSafeInteger(-0)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false beyond the safe range", () => {
      expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
      expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 2)).toBe(false);
      expect(isSafeInteger(2 ** 53)).toBe(false);
    });

    it("should return false for non-integer numbers", () => {
      expect(isSafeInteger(1.5)).toBe(false);
      expect(isSafeInteger(-0.1)).toBe(false);
    });

    it("should return false for NaN and infinities", () => {
      expect(isSafeInteger(NaN)).toBe(false);
      expect(isSafeInteger(Infinity)).toBe(false);
      expect(isSafeInteger(-Infinity)).toBe(false);
    });

    it("should return false for numeric strings and other types", () => {
      expect(isSafeInteger("42")).toBe(false);
      expect(isSafeInteger(null)).toBe(false);
      expect(isSafeInteger(undefined)).toBe(false);
      expect(isSafeInteger(42n)).toBe(false);
      expect(isSafeInteger([42])).toBe(false);
    });
  });
});
