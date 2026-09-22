import { IllegalArgumentException } from "@/exception";
import { requireNonInteger } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonInteger", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for numbers with a fractional part", () => {
      expect(requireNonInteger(1.5)).toBe(1.5);
      expect(requireNonInteger(-0.1)).toBe(-0.1);
      expect(requireNonInteger(1 / 3)).toBe(1 / 3);
    });

    it("should accept NaN and the infinities", () => {
      expect(requireNonInteger(NaN)).toBeNaN();
      expect(requireNonInteger(Infinity)).toBe(Infinity);
      expect(requireNonInteger(-Infinity)).toBe(-Infinity);
    });

    it("should accept non-numeric types", () => {
      expect(requireNonInteger("42")).toBe("42");
      expect(requireNonInteger(null)).toBeNull();
      expect(requireNonInteger(undefined)).toBeUndefined();
      expect(requireNonInteger(42n)).toBe(42n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for integers", () => {
      expect(() => requireNonInteger(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonInteger(42)).toThrow(IllegalArgumentException);
      expect(() => requireNonInteger(-42)).toThrow(IllegalArgumentException);
      expect(() => requireNonInteger(-0)).toThrow(IllegalArgumentException);
    });

    it("should throw for decimal literals without a fraction", () => {
      expect(() => requireNonInteger(1.0)).toThrow(IllegalArgumentException);
    });

    it("should throw beyond the safe integer range", () => {
      expect(() => requireNonInteger(Number.MAX_SAFE_INTEGER + 2)).toThrow(
        IllegalArgumentException
      );
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonInteger(42)).toThrow("Expected a value that is not an integer.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonInteger(42, "Weight must carry a fraction.")).toThrow(
        "Weight must carry a fraction."
      );
    });
  });
});
