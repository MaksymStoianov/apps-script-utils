import { IllegalArgumentException } from "@/exception";
import { requireArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireArray", () => {
  describe("Correct input data", () => {
    it("should return the array unchanged", () => {
      const input = [1, 2, 3];

      expect(requireArray(input)).toBe(input);
    });

    it("should accept an empty array", () => {
      expect(requireArray([])).toEqual([]);
    });

    it("should accept a sparse array", () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(requireArray([1, , 3])).toHaveLength(3);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for array-like values", () => {
      expect(() => requireArray("abc")).toThrow(IllegalArgumentException);
      expect(() => requireArray({ 0: "a", length: 1 })).toThrow(IllegalArgumentException);
      expect(() => requireArray(new Set([1, 2]))).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values", () => {
      expect(() => requireArray(null)).toThrow(IllegalArgumentException);
      expect(() => requireArray(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for other types", () => {
      expect(() => requireArray(0)).toThrow(IllegalArgumentException);
      expect(() => requireArray({})).toThrow(IllegalArgumentException);
      expect(() => requireArray(() => {})).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireArray("abc")).toThrow("Expected an array.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireArray("abc", "Values must be a list.")).toThrow("Values must be a list.");
    });
  });
});
