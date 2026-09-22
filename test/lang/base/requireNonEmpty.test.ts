import { IllegalArgumentException } from "@/exception";
import { requireNonEmpty } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonEmpty", () => {
  describe("Correct input data", () => {
    it("should return non-empty collections unchanged", () => {
      const input = [1];

      expect(requireNonEmpty(input)).toBe(input);
      expect(requireNonEmpty({ a: 1 })).toEqual({ a: 1 });
      expect(requireNonEmpty(new Set([1]))).toEqual(new Set([1]));
    });

    it("should return non-empty strings unchanged", () => {
      expect(requireNonEmpty("abc")).toBe("abc");
    });

    it("should accept numbers and booleans, which are never empty", () => {
      expect(requireNonEmpty(0)).toBe(0);
      expect(requireNonEmpty(false)).toBe(false);
    });

    it("should accept a blank string in strict mode", () => {
      expect(requireNonEmpty("   ", undefined, true)).toBe("   ");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for nil values", () => {
      expect(() => requireNonEmpty(null)).toThrow(IllegalArgumentException);
      expect(() => requireNonEmpty(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for empty collections", () => {
      expect(() => requireNonEmpty([])).toThrow(IllegalArgumentException);
      expect(() => requireNonEmpty({})).toThrow(IllegalArgumentException);
      expect(() => requireNonEmpty(new Map())).toThrow(IllegalArgumentException);
    });

    it("should throw for empty and blank strings by default", () => {
      expect(() => requireNonEmpty("")).toThrow(IllegalArgumentException);
      expect(() => requireNonEmpty("   ")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonEmpty([])).toThrow("Expected a non-empty value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonEmpty([], "At least one row is required.")).toThrow(
        "At least one row is required."
      );
    });
  });
});
