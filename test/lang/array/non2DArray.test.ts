import { non2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("non2DArray", () => {
  describe("Correct input data", () => {
    it("should return false when every element is an array", () => {
      expect(non2DArray([[1, 2], [3]])).toBe(false);
      expect(non2DArray([[1], [2], [3]])).toBe(false);
    });

    it("should return false when the rows themselves are empty", () => {
      expect(non2DArray([[], []])).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for an empty array", () => {
      expect(non2DArray([])).toBe(true);
    });

    it("should return true for a flat array", () => {
      expect(non2DArray([1, 2, 3])).toBe(true);
    });

    it("should return true when only some elements are arrays", () => {
      expect(non2DArray([[1], 2])).toBe(true);
    });

    it("should return true for non-array input rather than throwing", () => {
      expect(non2DArray("abc")).toBe(true);
      expect(non2DArray(42)).toBe(true);
      expect(non2DArray(null)).toBe(true);
      expect(non2DArray(undefined)).toBe(true);
      expect(non2DArray({ 0: [1], length: 1 })).toBe(true);
    });
  });
});
