import { first } from "@/lang";
import { describe, expect, it } from "vitest";

describe("first", () => {
  describe("Correct input data", () => {
    it("should return the first element", () => {
      expect(first([1, 2, 3])).toBe(1);
      expect(first(["a"])).toBe("a");
    });

    it("should return undefined for an empty array", () => {
      expect(first([])).toBeUndefined();
    });

    it("should return undefined when the first element is undefined", () => {
      expect(first([undefined, 1])).toBeUndefined();
    });

    it("should return the first n elements", () => {
      expect(first([1, 2, 3], 2)).toStrictEqual([1, 2]);
      expect(first([1, 2, 3], 3)).toStrictEqual([1, 2, 3]);
    });

    it("should return an empty array for n = 0", () => {
      expect(first([1, 2, 3], 0)).toStrictEqual([]);
    });

    it("should return an empty array for a negative n", () => {
      expect(first([1, 2, 3], -1)).toStrictEqual([]);
      expect(first([1, 2, 3], -10)).toStrictEqual([]);
    });

    it("should clamp an n beyond the length", () => {
      expect(first([1, 2], 10)).toStrictEqual([1, 2]);
      expect(first([], 10)).toStrictEqual([]);
    });

    it("should leave the original array untouched", () => {
      const input = [1, 2, 3];

      first(input, 2);

      expect(input).toStrictEqual([1, 2, 3]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the input is not an array", () => {
      expect(() => first("abc" as unknown as string[])).toThrow(TypeError);
      expect(() => first(null as unknown as number[])).toThrow(TypeError);
    });

    it("should throw when n is not an integer", () => {
      expect(() => first([1, 2], 1.5)).toThrow(TypeError);
      expect(() => first([1, 2], NaN)).toThrow(TypeError);
      expect(() => first([1, 2], "2" as unknown as number)).toThrow(TypeError);
    });
  });
});
