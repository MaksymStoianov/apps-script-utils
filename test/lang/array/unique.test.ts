import { unique } from "@/lang";
import { describe, expect, it } from "vitest";

describe("unique", () => {
  describe("Correct input data", () => {
    it("should remove duplicate primitives, keeping the first occurrence", () => {
      expect(unique([1, 2, 2, 3, 1])).toStrictEqual([1, 2, 3]);
      expect(unique(["a", "b", "a"])).toStrictEqual(["a", "b"]);
      expect(unique([true, false, true])).toStrictEqual([true, false]);
    });

    it("should deduplicate NaN against itself", () => {
      expect(unique([NaN, NaN, 1])).toStrictEqual([NaN, 1]);
    });

    it("should collapse -0 with 0", () => {
      const result = unique([0, -0]);

      expect(result).toHaveLength(1);
      expect(Object.is(result[0], 0)).toBe(true);
    });

    it("should deduplicate null and undefined", () => {
      expect(unique([null, null, undefined, undefined])).toStrictEqual([null, undefined]);
    });

    it("should keep distinct objects apart without an iteratee", () => {
      expect(unique([{ id: 1 }, { id: 1 }])).toHaveLength(2);
    });

    it("should deduplicate objects by the key the iteratee produces", () => {
      const first = { id: 1, name: "a" };

      expect(unique([first, { id: 1, name: "b" }, { id: 2 }], (o) => o.id)).toStrictEqual([
        first,
        { id: 2 }
      ]);
    });

    it("should return an empty array for an empty input", () => {
      expect(unique([])).toStrictEqual([]);
    });

    it("should leave the original array untouched", () => {
      const input = [1, 1, 2];

      unique(input);

      expect(input).toStrictEqual([1, 1, 2]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the input is not an array", () => {
      expect(() => unique("abc" as unknown as string[])).toThrow(TypeError);
      expect(() => unique(null as unknown as number[])).toThrow(TypeError);
      expect(() => unique(undefined as unknown as number[])).toThrow(TypeError);
    });
  });
});
