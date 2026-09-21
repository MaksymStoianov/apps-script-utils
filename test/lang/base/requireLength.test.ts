import { IllegalArgumentException } from "@/exception";
import { requireLength } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireLength", () => {
  describe("Correct input data", () => {
    it("should return valid lengths unchanged", () => {
      expect(requireLength(0)).toBe(0);
      expect(requireLength(1)).toBe(1);
      expect(requireLength(1000)).toBe(1000);
    });

    it("should accept the maximum safe integer", () => {
      expect(requireLength(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should accept the length of a real array", () => {
      expect(requireLength([1, 2, 3].length)).toBe(3);
      expect(requireLength([].length)).toBe(0);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for negative numbers", () => {
      expect(() => requireLength(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-integer numbers", () => {
      expect(() => requireLength(1.5)).toThrow(IllegalArgumentException);
      expect(() => requireLength(0.1)).toThrow(IllegalArgumentException);
    });

    it("should throw beyond the maximum safe integer", () => {
      expect(() => requireLength(Number.MAX_SAFE_INTEGER + 2)).toThrow(IllegalArgumentException);
      expect(() => requireLength(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and non-numeric types", () => {
      expect(() => requireLength(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireLength("1")).toThrow(IllegalArgumentException);
      expect(() => requireLength(null)).toThrow(IllegalArgumentException);
      expect(() => requireLength(undefined)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireLength(-1)).toThrow("Expected a valid array-like length.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireLength(-1, "Size cannot be negative.")).toThrow(
        "Size cannot be negative."
      );
    });
  });
});
