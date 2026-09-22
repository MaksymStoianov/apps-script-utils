import { IllegalArgumentException } from "@/exception";
import { requireNonDouble } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonDouble", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for integers", () => {
      expect(requireNonDouble(0)).toBe(0);
      expect(requireNonDouble(42)).toBe(42);
      expect(requireNonDouble(-42)).toBe(-42);
    });

    it("should accept decimal literals without a fraction", () => {
      expect(requireNonDouble(1.0)).toBe(1);
    });

    it("should accept NaN and the infinities", () => {
      expect(requireNonDouble(NaN)).toBeNaN();
      expect(requireNonDouble(Infinity)).toBe(Infinity);
    });

    it("should accept non-numeric types", () => {
      expect(requireNonDouble("1.5")).toBe("1.5");
      expect(requireNonDouble(null)).toBeNull();
      expect(requireNonDouble(undefined)).toBeUndefined();
      expect(requireNonDouble(42n)).toBe(42n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for numbers with a fractional part", () => {
      expect(() => requireNonDouble(1.5)).toThrow(IllegalArgumentException);
      expect(() => requireNonDouble(-0.1)).toThrow(IllegalArgumentException);
      expect(() => requireNonDouble(Number.MIN_VALUE)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonDouble(1.5)).toThrow("Expected a value without a fractional part.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonDouble(1.5, "Count cannot be fractional.")).toThrow(
        "Count cannot be fractional."
      );
    });
  });
});
