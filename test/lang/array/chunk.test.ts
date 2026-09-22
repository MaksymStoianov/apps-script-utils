import { chunk } from "@/lang";
import { describe, expect, it } from "vitest";

describe("chunk", () => {
  describe("Correct input data", () => {
    it("should split evenly when the size divides the length", () => {
      expect(chunk(["a", "b", "c", "d"], 2)).toEqual([
        ["a", "b"],
        ["c", "d"]
      ]);
    });

    it("should leave the remainder in the final chunk", () => {
      expect(chunk(["a", "b", "c", "d", "e"], 2)).toEqual([["a", "b"], ["c", "d"], ["e"]]);
    });

    it("should default the size to one", () => {
      expect(chunk(["a", "b", "c"])).toEqual([["a"], ["b"], ["c"]]);
    });

    it("should return a single chunk when the size exceeds the length", () => {
      expect(chunk([1, 2], 10)).toEqual([[1, 2]]);
    });

    it("should return an empty array for an empty input", () => {
      expect(chunk([])).toEqual([]);
    });

    it("should return an empty array for a size below one", () => {
      expect(chunk(["a", "b"], 0)).toEqual([]);
      expect(chunk(["a", "b"], -1)).toEqual([]);
    });

    it("should not mutate the input", () => {
      const input = [1, 2, 3];

      chunk(input, 2);

      expect(input).toEqual([1, 2, 3]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a non-array", () => {
      // @ts-expect-error - testing invalid types
      expect(() => chunk("abc", 2)).toThrow(TypeError);
      // @ts-expect-error - testing invalid types
      expect(() => chunk(null)).toThrow(TypeError);
    });

    it("should throw for a non-integer size", () => {
      expect(() => chunk([1, 2, 3], 1.5)).toThrow(TypeError);
      expect(() => chunk([1, 2, 3], NaN)).toThrow(TypeError);
    });
  });
});
