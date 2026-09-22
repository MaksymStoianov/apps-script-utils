import { IllegalArgumentException } from "@/exception";
import { requireDouble } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireDouble", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for numbers with a fractional part", () => {
      expect(requireDouble(1.5)).toBe(1.5);
      expect(requireDouble(-0.1)).toBe(-0.1);
      expect(requireDouble(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for integers", () => {
      expect(() => requireDouble(0)).toThrow(IllegalArgumentException);
      expect(() => requireDouble(42)).toThrow(IllegalArgumentException);
    });

    it("should throw for decimal literals without a fraction", () => {
      expect(() => requireDouble(1.0)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and infinities", () => {
      expect(() => requireDouble(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireDouble(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      expect(() => requireDouble("1.5")).toThrow(IllegalArgumentException);
      expect(() => requireDouble(null)).toThrow(IllegalArgumentException);
      expect(() => requireDouble(42n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireDouble(42)).toThrow("Expected a number with a fractional part.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireDouble(42, "Rate must be decimal.")).toThrow("Rate must be decimal.");
    });
  });
});
