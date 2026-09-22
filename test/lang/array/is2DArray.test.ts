import { is2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("is2DArray", () => {
  describe("Correct input data", () => {
    it("should return true when every element is an array", () => {
      expect(is2DArray([[1, 2], [3]])).toBe(true);
      expect(is2DArray([[1], [2], [3]])).toBe(true);
    });

    it("should return true for rows of differing lengths", () => {
      expect(is2DArray([[1, 2, 3], [4]])).toBe(true);
    });

    it("should return true when the rows themselves are empty", () => {
      expect(is2DArray([[], []])).toBe(true);
    });

    it("should return true for deeper nesting", () => {
      expect(is2DArray([[[1]], [[2]]])).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for an empty array", () => {
      expect(is2DArray([])).toBe(false);
    });

    it("should return false for a flat array", () => {
      expect(is2DArray([1, 2, 3])).toBe(false);
    });

    it("should return false when only some elements are arrays", () => {
      expect(is2DArray([[1], 2])).toBe(false);
      expect(is2DArray([1, [2]])).toBe(false);
    });

    it("should return false for non-array input rather than throwing", () => {
      expect(is2DArray("abc")).toBe(false);
      expect(is2DArray(42)).toBe(false);
      expect(is2DArray(null)).toBe(false);
      expect(is2DArray(undefined)).toBe(false);
      expect(is2DArray({ 0: [1], length: 1 })).toBe(false);
    });
  });
});
