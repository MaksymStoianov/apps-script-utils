import { IllegalArgumentException } from "@/exception";
import { requireNonFloat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonFloat", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for integers", () => {
      expect(requireNonFloat(0)).toBe(0);
      expect(requireNonFloat(42)).toBe(42);
      expect(requireNonFloat(-42)).toBe(-42);
    });

    it("should accept decimal literals without a fraction", () => {
      expect(requireNonFloat(1.0)).toBe(1);
    });

    it("should accept NaN and the infinities", () => {
      expect(requireNonFloat(NaN)).toBeNaN();
      expect(requireNonFloat(Infinity)).toBe(Infinity);
      expect(requireNonFloat(-Infinity)).toBe(-Infinity);
    });

    it("should accept non-numeric types", () => {
      expect(requireNonFloat("1.5")).toBe("1.5");
      expect(requireNonFloat(null)).toBeNull();
      expect(requireNonFloat(undefined)).toBeUndefined();
      expect(requireNonFloat(42n)).toBe(42n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for numbers with a fractional part", () => {
      expect(() => requireNonFloat(1.5)).toThrow(IllegalArgumentException);
      expect(() => requireNonFloat(-0.1)).toThrow(IllegalArgumentException);
      expect(() => requireNonFloat(1 / 3)).toThrow(IllegalArgumentException);
      expect(() => requireNonFloat(Number.MIN_VALUE)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonFloat(1.5)).toThrow("Expected a value without a fractional part.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonFloat(1.5, "Count cannot be fractional.")).toThrow(
        "Count cannot be fractional."
      );
    });
  });
});
