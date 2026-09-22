import { IllegalArgumentException } from "@/exception";
import { requireSafeInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireSafeInteger", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for safe integers", () => {
      expect(requireSafeInteger(0)).toBe(0);
      expect(requireSafeInteger(42)).toBe(42);
      expect(requireSafeInteger(-42)).toBe(-42);
    });

    it("should accept the bounds of the safe integer range", () => {
      expect(requireSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
      expect(requireSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
    });

    it("should accept decimal literals without a fraction", () => {
      expect(requireSafeInteger(1.0)).toBe(1);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw beyond the safe integer range", () => {
      expect(() => requireSafeInteger(Number.MAX_SAFE_INTEGER + 2)).toThrow(
        IllegalArgumentException
      );
      expect(() => requireSafeInteger(Number.MIN_SAFE_INTEGER - 2)).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for numbers with a fractional part", () => {
      expect(() => requireSafeInteger(1.5)).toThrow(IllegalArgumentException);
      expect(() => requireSafeInteger(-0.1)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and infinities", () => {
      expect(() => requireSafeInteger(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireSafeInteger(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      expect(() => requireSafeInteger("42")).toThrow(IllegalArgumentException);
      expect(() => requireSafeInteger(null)).toThrow(IllegalArgumentException);
      expect(() => requireSafeInteger(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireSafeInteger(42n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireSafeInteger(1.5)).toThrow("Expected a safe integer.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireSafeInteger(1.5, "Id must be a whole number.")).toThrow(
        "Id must be a whole number."
      );
    });
  });
});
