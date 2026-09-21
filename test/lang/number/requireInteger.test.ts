import { IllegalArgumentException } from "@/exception";
import { requireInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireInteger", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for integers", () => {
      expect(requireInteger(0)).toBe(0);
      expect(requireInteger(42)).toBe(42);
      expect(requireInteger(-42)).toBe(-42);
    });

    it("should accept decimal literals without a fraction", () => {
      expect(requireInteger(1.0)).toBe(1);
    });

    it("should accept values beyond the safe integer range", () => {
      expect(requireInteger(Number.MAX_SAFE_INTEGER + 2)).toBe(Number.MAX_SAFE_INTEGER + 2);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for numbers with a fractional part", () => {
      expect(() => requireInteger(1.5)).toThrow(IllegalArgumentException);
      expect(() => requireInteger(-0.1)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and infinities", () => {
      expect(() => requireInteger(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireInteger(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      expect(() => requireInteger("42")).toThrow(IllegalArgumentException);
      expect(() => requireInteger(null)).toThrow(IllegalArgumentException);
      expect(() => requireInteger(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireInteger(42n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireInteger("42")).toThrow("Expected an integer.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireInteger("42", "Row must be a whole number.")).toThrow(
        "Row must be a whole number."
      );
    });
  });
});
