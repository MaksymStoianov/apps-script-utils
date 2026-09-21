import { transpose } from "@/lang";
import { describe, expect, it } from "vitest";

describe("transpose", () => {
  describe("Correct input data", () => {
    it("should swap rows and columns", () => {
      expect(
        transpose([
          [1, 2, 3],
          [4, 5, 6]
        ])
      ).toEqual([
        [1, 4],
        [2, 5],
        [3, 6]
      ]);
    });

    it("should turn a single row into a column", () => {
      expect(transpose([[1, 2, 3]])).toEqual([[1], [2], [3]]);
    });

    it("should be its own inverse for a rectangular matrix", () => {
      const matrix = [
        [1, 2],
        [3, 4],
        [5, 6]
      ];

      expect(transpose(transpose(matrix))).toEqual(matrix);
    });

    it("should not mutate the input", () => {
      const matrix = [
        [1, 2],
        [3, 4]
      ];

      transpose(matrix);

      expect(matrix).toEqual([
        [1, 2],
        [3, 4]
      ]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a ragged matrix", () => {
      expect(() => transpose([[1, 2], [3]])).toThrow();
    });

    it("should throw for a flat array", () => {
      expect(() => transpose([1, 2, 3])).toThrow();
    });

    it("should throw for a non-array and for an empty array", () => {
      expect(() => transpose("abc")).toThrow();
      expect(() => transpose(null)).toThrow();
      expect(() => transpose([])).toThrow();
    });
  });
});
