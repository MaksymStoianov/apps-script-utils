import { last } from "@/lang";
import { describe, expect, it } from "vitest";

describe("last", () => {
  describe("Correct input data", () => {
    it("should return the last element", () => {
      expect(last([1, 2, 3])).toBe(3);
      expect(last(["a"])).toBe("a");
    });

    it("should return undefined for an empty array", () => {
      expect(last([])).toBeUndefined();
    });

    it("should return undefined when the last element is undefined", () => {
      expect(last([1, undefined])).toBeUndefined();
    });

    it("should return the last n elements in their original order", () => {
      expect(last([1, 2, 3], 2)).toStrictEqual([2, 3]);
      expect(last([1, 2, 3], 3)).toStrictEqual([1, 2, 3]);
      expect(last(["a", "b", "c"], 2)).toStrictEqual(["b", "c"]);
    });

    it("should return an empty array for n = 0", () => {
      expect(last([1, 2, 3], 0)).toStrictEqual([]);
    });

    it("should return an empty array for a negative n", () => {
      expect(last([1, 2, 3], -1)).toStrictEqual([]);
      expect(last([1, 2, 3], -10)).toStrictEqual([]);
    });

    it("should clamp an n beyond the length", () => {
      expect(last([1, 2], 10)).toStrictEqual([1, 2]);
      expect(last([], 10)).toStrictEqual([]);
    });

    it("should leave the original array untouched", () => {
      const input = [1, 2, 3];

      last(input, 2);

      expect(input).toStrictEqual([1, 2, 3]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the input is not an array", () => {
      expect(() => last("abc" as unknown as string[])).toThrow(TypeError);
      expect(() => last(null as unknown as number[])).toThrow(TypeError);
    });

    it("should throw when n is not an integer", () => {
      expect(() => last([1, 2], 1.5)).toThrow(TypeError);
      expect(() => last([1, 2], NaN)).toThrow(TypeError);
      expect(() => last([1, 2], "2" as unknown as number)).toThrow(TypeError);
    });
  });
});
