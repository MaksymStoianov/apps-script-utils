import { isConsistent2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isConsistent2DArray", () => {
  describe("Correct input data", () => {
    it("should return true for a rectangular matrix", () => {
      expect(
        isConsistent2DArray([
          [1, 2],
          [3, 4]
        ])
      ).toBe(true);
    });

    it("should return true for a single row", () => {
      expect(isConsistent2DArray([[1, 2, 3]])).toBe(true);
    });

    it("should return true when every row is empty", () => {
      expect(isConsistent2DArray([[], []])).toBe(true);
    });

    it("should compare lengths only, not contents", () => {
      expect(
        isConsistent2DArray([
          [1, "a"],
          [null, undefined]
        ])
      ).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for a ragged matrix", () => {
      expect(isConsistent2DArray([[1, 2], [3]])).toBe(false);
      expect(isConsistent2DArray([[1], [2, 3]])).toBe(false);
    });

    it("should return false when one row is empty and another is not", () => {
      expect(isConsistent2DArray([[1], []])).toBe(false);
    });

    it("should return false for a flat array rather than throwing", () => {
      expect(isConsistent2DArray([1, 2])).toBe(false);
    });

    it("should return false for an empty array", () => {
      expect(isConsistent2DArray([])).toBe(false);
    });

    it("should return false for non-array input rather than throwing", () => {
      expect(isConsistent2DArray("abc")).toBe(false);
      expect(isConsistent2DArray(42)).toBe(false);
      expect(isConsistent2DArray(null)).toBe(false);
      expect(isConsistent2DArray(undefined)).toBe(false);
    });
  });
});
