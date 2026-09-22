import { isArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isArray", () => {
  describe("Correct input data", () => {
    it("should return true for arrays", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(new Array(3))).toBe(true);
    });

    it("should return true for an array from another realm-like construction", () => {
      expect(isArray(Array.from("abc"))).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for array-like values", () => {
      expect(isArray({ 0: "a", length: 1 })).toBe(false);
      expect(isArray("abc")).toBe(false);
      expect(isArray(new Set([1]))).toBe(false);
    });

    it("should return false for nil values and other types", () => {
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray({})).toBe(false);
      expect(isArray(42)).toBe(false);
      expect(isArray(() => {})).toBe(false);
    });
  });
});
