import { without } from "@/lang";
import { describe, expect, it } from "vitest";

describe("without", () => {
  describe("Correct input data", () => {
    it("should remove every occurrence of a value", () => {
      expect(without([1, 2, 3, 2], 2)).toStrictEqual([1, 3]);
    });

    it("should remove several values at once", () => {
      expect(without([1, 2, 3, 4], 2, 4)).toStrictEqual([1, 3]);
    });

    it("should remove NaN, which strict equality never matches", () => {
      expect(without([NaN, 1, NaN], NaN)).toStrictEqual([1]);
    });

    it("should treat -0 and 0 as the same value", () => {
      expect(without([0, 1], -0)).toStrictEqual([1]);
      expect(without([-0, 1], 0)).toStrictEqual([1]);
    });

    it("should remove null and undefined", () => {
      expect(without([null, undefined, 1], null, undefined)).toStrictEqual([1]);
    });

    it("should return a copy when a value is absent", () => {
      expect(without([1, 2], 9)).toStrictEqual([1, 2]);
    });

    it("should return a copy when no values are given", () => {
      const input = [1, 2];

      const result = without(input);

      expect(result).toStrictEqual([1, 2]);
      expect(result).not.toBe(input);
    });

    it("should return an empty array when everything is excluded", () => {
      expect(without([1, 2], 1, 2)).toStrictEqual([]);
    });

    it("should compare objects by identity", () => {
      const kept = { id: 1 };

      const removed = { id: 2 };

      expect(without([kept, removed], removed)).toStrictEqual([kept]);
      expect(without([kept], { id: 1 })).toStrictEqual([kept]);
    });

    it("should leave the original array untouched", () => {
      const input = [1, 2, 3];

      without(input, 2);

      expect(input).toStrictEqual([1, 2, 3]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the input is not an array", () => {
      expect(() => without("abc" as unknown as string[], "a")).toThrow(TypeError);
      expect(() => without(null as unknown as number[], 1)).toThrow(TypeError);
    });
  });
});
