import { IllegalArgumentException } from "@/exception";
import { requireFloat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireFloat", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for numbers with a fractional part", () => {
      expect(requireFloat(1.5)).toBe(1.5);
      expect(requireFloat(-0.1)).toBe(-0.1);
      expect(requireFloat(1 / 3)).toBe(1 / 3);
    });

    it("should accept the smallest representable fraction", () => {
      expect(requireFloat(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for integers", () => {
      expect(() => requireFloat(0)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(42)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(-42)).toThrow(IllegalArgumentException);
    });

    it("should throw for decimal literals without a fraction", () => {
      expect(() => requireFloat(1.0)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and infinities", () => {
      expect(() => requireFloat(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(Infinity)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(-Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      expect(() => requireFloat("1.5")).toThrow(IllegalArgumentException);
      expect(() => requireFloat(null)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireFloat(42n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireFloat(42)).toThrow("Expected a number with a fractional part.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireFloat(42, "Rate must be a decimal.")).toThrow("Rate must be a decimal.");
    });
  });
});
