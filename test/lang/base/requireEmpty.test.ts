import { IllegalArgumentException } from "@/exception";
import { requireEmpty } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireEmpty", () => {
  describe("Correct input data", () => {
    it("should accept nil values", () => {
      expect(requireEmpty(null)).toBeNull();
      expect(requireEmpty(undefined)).toBeUndefined();
    });

    it("should accept empty collections", () => {
      expect(requireEmpty([])).toEqual([]);
      expect(requireEmpty({})).toEqual({});
      expect(requireEmpty(new Set())).toEqual(new Set());
      expect(requireEmpty(new Map())).toEqual(new Map());
    });

    it("should accept empty and blank strings by default", () => {
      expect(requireEmpty("")).toBe("");
      expect(requireEmpty("   ")).toBe("   ");
    });

    it("should return the same reference", () => {
      const input: unknown[] = [];

      expect(requireEmpty(input)).toBe(input);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for non-empty collections", () => {
      expect(() => requireEmpty([1])).toThrow(IllegalArgumentException);
      expect(() => requireEmpty({ a: 1 })).toThrow(IllegalArgumentException);
      expect(() => requireEmpty(new Set([1]))).toThrow(IllegalArgumentException);
    });

    it("should throw for non-empty strings", () => {
      expect(() => requireEmpty("abc")).toThrow(IllegalArgumentException);
    });

    it("should throw for numbers and booleans, which are never empty", () => {
      expect(() => requireEmpty(0)).toThrow(IllegalArgumentException);
      expect(() => requireEmpty(false)).toThrow(IllegalArgumentException);
    });

    it("should reject a blank string in strict mode", () => {
      expect(() => requireEmpty("   ", undefined, true)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireEmpty([1])).toThrow("Expected an empty value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireEmpty([1], "The target range must be empty.")).toThrow(
        "The target range must be empty."
      );
    });
  });
});
