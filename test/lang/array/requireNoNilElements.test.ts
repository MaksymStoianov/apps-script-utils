import { IllegalArgumentException } from "@/exception";
import { requireNoNilElements } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNoNilElements", () => {
  describe("Correct input data", () => {
    it("should return the same array when no element is nil", () => {
      const values = [1, "a", false, 0, "", NaN, {}, []];

      expect(requireNoNilElements(values)).toBe(values);
    });

    it("should accept an empty collection", () => {
      expect(requireNoNilElements([])).toStrictEqual([]);
      expect(requireNoNilElements(new Set())).toStrictEqual(new Set());
      expect(requireNoNilElements(new Map())).toStrictEqual(new Map());
    });

    it("should return the same set when no member is nil", () => {
      const values = new Set([1, 2, 3]);

      expect(requireNoNilElements(values)).toBe(values);
    });

    it("should check the values of a map and ignore its keys", () => {
      const values = new Map<unknown, number>([
        [null, 1],
        [undefined, 2]
      ]);

      expect(requireNoNilElements(values)).toBe(values);
    });

    it("should leave nested arrays alone", () => {
      const values = [[null], [undefined, 1]];

      expect(requireNoNilElements(values)).toBe(values);
    });

    it("should pass a nil collection through unchanged", () => {
      expect(requireNoNilElements(null)).toBeNull();
      expect(requireNoNilElements(undefined)).toBeUndefined();
    });

    it("should narrow the element type", () => {
      const values: (string | null)[] = ["a", "b"];

      const checked: string[] = requireNoNilElements(values);

      expect(checked).toBe(values);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when an array contains null or undefined", () => {
      expect(() => requireNoNilElements([1, null, 3])).toThrow(IllegalArgumentException);
      expect(() => requireNoNilElements([1, undefined, 3])).toThrow(IllegalArgumentException);
      expect(() => requireNoNilElements([null])).toThrow(IllegalArgumentException);
    });

    it("should treat a hole as an undefined element", () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(() => requireNoNilElements([1, , 3])).toThrow(IllegalArgumentException);
    });

    it("should throw when a set contains null or undefined", () => {
      expect(() => requireNoNilElements(new Set([1, null]))).toThrow(IllegalArgumentException);
      expect(() => requireNoNilElements(new Set([undefined]))).toThrow(IllegalArgumentException);
    });

    it("should throw when a map has a null or undefined value", () => {
      expect(() => requireNoNilElements(new Map([["a", null]]))).toThrow(IllegalArgumentException);
      expect(() => requireNoNilElements(new Map([["a", undefined]]))).toThrow(
        IllegalArgumentException
      );
    });

    it("should carry the default message when none is given", () => {
      expect(() => requireNoNilElements([null])).toThrow(
        "Collection must not contain any null or undefined elements."
      );
    });

    it("should carry the message it was given", () => {
      expect(() => requireNoNilElements([null], "Row has a blank cell.")).toThrow(
        "Row has a blank cell."
      );
    });

    it("should reject a value that is not a collection", () => {
      for (const value of [0, 1, "abc", true, {}, () => {}, Symbol("s"), new Date()]) {
        // @ts-expect-error - testing invalid types
        expect(() => requireNoNilElements(value)).toThrow(IllegalArgumentException);
      }
    });

    it("should not treat a non-collection as a nil-element failure", () => {
      // @ts-expect-error - testing invalid types
      expect(() => requireNoNilElements("abc", "custom")).toThrow(
        "Expected an array, a Set or a Map."
      );
    });
  });
});
