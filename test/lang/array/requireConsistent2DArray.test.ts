import { IllegalArgumentException } from "@/exception";
import { requireConsistent2DArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireConsistent2DArray", () => {
  describe("Correct input data", () => {
    it("should return the same array reference", () => {
      const input = [
        [1, 2],
        [3, 4]
      ];

      expect(requireConsistent2DArray(input)).toBe(input);
    });

    it("should accept a single row", () => {
      expect(requireConsistent2DArray([[1, 2, 3]])).toEqual([[1, 2, 3]]);
    });

    it("should accept rows that are all empty", () => {
      expect(requireConsistent2DArray([[], []])).toEqual([[], []]);
    });

    it("should compare lengths only, not contents", () => {
      expect(
        requireConsistent2DArray([
          [1, "a"],
          [null, undefined]
        ])
      ).toEqual([
        [1, "a"],
        [null, undefined]
      ]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a ragged matrix", () => {
      expect(() => requireConsistent2DArray([[1, 2], [3]])).toThrow(IllegalArgumentException);
    });

    it("should name the offending row and both lengths", () => {
      expect(() => requireConsistent2DArray([[1, 2], [3]])).toThrow(
        "Expected every row to have 2 columns, but row 1 has 1."
      );
    });

    it("should report the first offending row when several differ", () => {
      expect(() => requireConsistent2DArray([[1, 2], [3], [4, 5, 6]])).toThrow("but row 1 has 1.");
    });

    it("should throw when one row is empty and another is not", () => {
      expect(() => requireConsistent2DArray([[1], []])).toThrow(IllegalArgumentException);
    });

    it("should throw for input that is not a two-dimensional array", () => {
      expect(() => requireConsistent2DArray([1, 2])).toThrow(
        "Expected a non-empty two-dimensional array."
      );
      expect(() => requireConsistent2DArray([])).toThrow(IllegalArgumentException);
      expect(() => requireConsistent2DArray("abc")).toThrow(IllegalArgumentException);
      expect(() => requireConsistent2DArray(null)).toThrow(IllegalArgumentException);
    });

    it("should use a custom message for both failure kinds when provided", () => {
      expect(() => requireConsistent2DArray([[1, 2], [3]], "Matrix required.")).toThrow(
        "Matrix required."
      );
      expect(() => requireConsistent2DArray("abc", "Matrix required.")).toThrow("Matrix required.");
    });
  });
});
