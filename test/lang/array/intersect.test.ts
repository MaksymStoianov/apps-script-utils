import { intersect } from "@/lang";
import { describe, expect, it } from "vitest";

describe("intersect", () => {
  describe("Correct input data", () => {
    it("should return the values present in both arrays", () => {
      expect(intersect([1, 2, 3], [2, 3, 4])).toStrictEqual([2, 3]);
    });

    it("should return the values present in every array", () => {
      expect(intersect([1, 2, 3], [2, 3], [3, 9])).toStrictEqual([3]);
    });

    it("should take the order from the first array", () => {
      expect(intersect([3, 1, 2], [1, 2, 3])).toStrictEqual([3, 1, 2]);
    });

    it("should deduplicate values repeated in the first array", () => {
      expect(intersect([1, 1, 2], [1, 2])).toStrictEqual([1, 2]);
    });

    it("should intersect NaN with itself", () => {
      expect(intersect([NaN, 1], [NaN, 2])).toStrictEqual([NaN]);
    });

    it("should return an empty array for disjoint inputs", () => {
      expect(intersect([1, 2], [9])).toStrictEqual([]);
    });

    it("should deduplicate a single array", () => {
      expect(intersect([1, 1, 2])).toStrictEqual([1, 2]);
    });

    it("should return an empty array when no arguments are given", () => {
      expect(intersect()).toStrictEqual([]);
    });

    it("should return an empty array when any input is empty", () => {
      expect(intersect([1, 2], [])).toStrictEqual([]);
      expect(intersect([], [1, 2])).toStrictEqual([]);
    });

    it("should leave the original arrays untouched", () => {
      const a = [1, 2, 3];

      const b = [2, 3];

      intersect(a, b);

      expect(a).toStrictEqual([1, 2, 3]);
      expect(b).toStrictEqual([2, 3]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when any argument is not an array", () => {
      expect(() => intersect("ab" as unknown as string[])).toThrow(TypeError);
      expect(() => intersect([1, 2], null as unknown as number[])).toThrow(TypeError);
      expect(() => intersect([1, 2], 3 as unknown as number[])).toThrow(TypeError);
    });
  });
});
