import { IllegalArgumentException } from "@/exception";
import { requireNonArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonArray", () => {
  describe("Correct input data", () => {
    it("should return primitives unchanged", () => {
      expect(requireNonArray(42)).toBe(42);
      expect(requireNonArray("abc")).toBe("abc");
      expect(requireNonArray(false)).toBe(false);
    });

    it("should return nil values unchanged", () => {
      expect(requireNonArray(null)).toBeNull();
      expect(requireNonArray(undefined)).toBeUndefined();
    });

    it("should accept array-like values that are not arrays", () => {
      const arrayLike = { 0: "a", length: 1 };

      expect(requireNonArray(arrayLike)).toBe(arrayLike);
      expect(requireNonArray(new Set([1, 2]))).toBeInstanceOf(Set);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for arrays", () => {
      expect(() => requireNonArray([1, 2])).toThrow(IllegalArgumentException);
      expect(() => requireNonArray([])).toThrow(IllegalArgumentException);
    });

    it("should throw for a nested array", () => {
      expect(() => requireNonArray([[1]])).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonArray([1])).toThrow("Expected a non-array value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonArray([1], "Only a single value is accepted.")).toThrow(
        "Only a single value is accepted."
      );
    });
  });
});
