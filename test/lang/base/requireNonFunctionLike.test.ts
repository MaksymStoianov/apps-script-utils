import { IllegalArgumentException } from "@/exception";
import { requireNonFunctionLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonFunctionLike", () => {
  describe("Correct input data", () => {
    it("should return primitives and nil values unchanged", () => {
      expect(requireNonFunctionLike(42)).toBe(42);
      expect(requireNonFunctionLike("fn")).toBe("fn");
      expect(requireNonFunctionLike(null)).toBeNull();
      expect(requireNonFunctionLike(undefined)).toBeUndefined();
    });

    it("should accept objects that are not callable", () => {
      const input = { a: 1 };

      expect(requireNonFunctionLike(input)).toBe(input);
      expect(requireNonFunctionLike([])).toEqual([]);
      expect(requireNonFunctionLike(/regexp/)).toBeInstanceOf(RegExp);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for every callable shape", () => {
      expect(() => requireNonFunctionLike(() => {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunctionLike(function named() {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunctionLike(function* generator() {})).toThrow(
        IllegalArgumentException
      );
      expect(() => requireNonFunctionLike(async () => {})).toThrow(IllegalArgumentException);
    });

    it("should throw for async generator functions", () => {
      expect(() => requireNonFunctionLike(async function* asyncGenerator() {})).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for classes and built-in constructors", () => {
      expect(() => requireNonFunctionLike(class Sample {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunctionLike(Array)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonFunctionLike(() => {})).toThrow("Expected a non-function value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonFunctionLike(() => {}, "A plain value is required.")).toThrow(
        "A plain value is required."
      );
    });
  });
});
