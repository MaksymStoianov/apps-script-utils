import { IllegalArgumentException } from "@/exception";
import { require2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("require2DArray", () => {
  describe("Correct input data", () => {
    it("should return the same array reference", () => {
      const input = [[1, 2], [3]];

      expect(require2DArray(input)).toBe(input);
    });

    it("should accept rows of differing lengths", () => {
      expect(require2DArray([[1, 2, 3], [4]])).toEqual([[1, 2, 3], [4]]);
    });

    it("should accept rows that are themselves empty", () => {
      expect(require2DArray([[], []])).toEqual([[], []]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for an empty array", () => {
      expect(() => require2DArray([])).toThrow(IllegalArgumentException);
    });

    it("should throw for a flat array", () => {
      expect(() => require2DArray([1, 2, 3])).toThrow(IllegalArgumentException);
    });

    it("should throw when only some elements are arrays", () => {
      expect(() => require2DArray([[1], 2])).toThrow(IllegalArgumentException);
    });

    it("should throw for non-array input", () => {
      expect(() => require2DArray("abc")).toThrow(IllegalArgumentException);
      expect(() => require2DArray(null)).toThrow(IllegalArgumentException);
      expect(() => require2DArray({ 0: [1], length: 1 })).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => require2DArray([1])).toThrow("Expected a non-empty two-dimensional array.");
    });

    it("should use a custom message when provided", () => {
      expect(() => require2DArray([1], "Values must be a matrix.")).toThrow(
        "Values must be a matrix."
      );
    });
  });
});
