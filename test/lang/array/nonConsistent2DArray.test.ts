import { nonConsistent2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonConsistent2DArray", () => {
  describe("Correct input data", () => {
    it("should return false for a rectangular matrix", () => {
      expect(
        nonConsistent2DArray([
          [1, 2],
          [3, 4]
        ])
      ).toBe(false);
    });

    it("should return false for a single row", () => {
      expect(nonConsistent2DArray([[1, 2, 3]])).toBe(false);
    });

    it("should return false when every row is empty", () => {
      expect(nonConsistent2DArray([[], []])).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a ragged matrix", () => {
      expect(nonConsistent2DArray([[1, 2], [3]])).toBe(true);
      expect(nonConsistent2DArray([[1], [2, 3]])).toBe(true);
    });

    it("should return true when one row is empty and another is not", () => {
      expect(nonConsistent2DArray([[1], []])).toBe(true);
    });

    it("should return true for a flat array", () => {
      expect(nonConsistent2DArray([1, 2])).toBe(true);
    });

    it("should return true for an empty array", () => {
      expect(nonConsistent2DArray([])).toBe(true);
    });

    it("should return true for non-array input rather than throwing", () => {
      expect(nonConsistent2DArray("abc")).toBe(true);
      expect(nonConsistent2DArray(null)).toBe(true);
      expect(nonConsistent2DArray(undefined)).toBe(true);
    });
  });
});
