import { IllegalArgumentException } from "@/exception";
import { requireNonSafeInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonSafeInteger", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged beyond the safe integer range", () => {
      expect(requireNonSafeInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(Number.MAX_SAFE_INTEGER + 2);
      expect(requireNonSafeInteger(Number.MIN_SAFE_INTEGER - 2)).toBe(Number.MIN_SAFE_INTEGER - 2);
    });

    it("should accept numbers with a fractional part", () => {
      expect(requireNonSafeInteger(1.5)).toBe(1.5);
      expect(requireNonSafeInteger(-0.1)).toBe(-0.1);
    });

    it("should accept NaN and the infinities", () => {
      expect(requireNonSafeInteger(NaN)).toBeNaN();
      expect(requireNonSafeInteger(Infinity)).toBe(Infinity);
      expect(requireNonSafeInteger(-Infinity)).toBe(-Infinity);
    });

    it("should accept non-numeric types", () => {
      expect(requireNonSafeInteger("42")).toBe("42");
      expect(requireNonSafeInteger(null)).toBeNull();
      expect(requireNonSafeInteger(undefined)).toBeUndefined();
      expect(requireNonSafeInteger(42n)).toBe(42n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for safe integers", () => {
      expect(() => requireNonSafeInteger(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonSafeInteger(42)).toThrow(IllegalArgumentException);
      expect(() => requireNonSafeInteger(-42)).toThrow(IllegalArgumentException);
      expect(() => requireNonSafeInteger(1.0)).toThrow(IllegalArgumentException);
    });

    it("should throw at the bounds of the safe integer range", () => {
      expect(() => requireNonSafeInteger(Number.MAX_SAFE_INTEGER)).toThrow(
        IllegalArgumentException
      );
      expect(() => requireNonSafeInteger(Number.MIN_SAFE_INTEGER)).toThrow(
        IllegalArgumentException
      );
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonSafeInteger(42)).toThrow(
        "Expected a value that is not a safe integer."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonSafeInteger(42, "Expected a value outside the exact range.")).toThrow(
        "Expected a value outside the exact range."
      );
    });
  });
});
