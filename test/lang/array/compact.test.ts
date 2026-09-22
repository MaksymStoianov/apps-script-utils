import { compact } from "@/lang";
import { describe, expect, it } from "vitest";

describe("compact", () => {
  describe("Correct input data", () => {
    it("should remove every falsy value", () => {
      expect(compact([0, 1, false, 2, "", 3, null, undefined, NaN])).toStrictEqual([1, 2, 3]);
    });

    it("should remove false", () => {
      expect(compact([false, true])).toStrictEqual([true]);
    });

    it("should remove null and undefined", () => {
      expect(compact([null, undefined, 1])).toStrictEqual([1]);
    });

    it("should remove zero, negative zero and the bigint zero", () => {
      expect(compact([0, 1])).toStrictEqual([1]);
      expect(compact([-0, 1])).toStrictEqual([1]);
      expect(compact([0n, 1n])).toStrictEqual([1n]);
    });

    it("should remove the empty string but keep other strings", () => {
      expect(compact(["", "a", " "])).toStrictEqual(["a", " "]);
    });

    it("should remove NaN", () => {
      expect(compact([NaN, 1])).toStrictEqual([1]);
    });

    it("should keep empty arrays and objects, which are truthy", () => {
      expect(compact([[], {}])).toStrictEqual([[], {}]);
    });

    it("should return an empty array for an empty input", () => {
      expect(compact([])).toStrictEqual([]);
    });

    it("should leave the original array untouched", () => {
      const input = [0, 1, null];

      compact(input);

      expect(input).toStrictEqual([0, 1, null]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the input is not an array", () => {
      expect(() => compact("abc" as unknown as string[])).toThrow(TypeError);
      expect(() => compact(null as unknown as number[])).toThrow(TypeError);
    });
  });
});
