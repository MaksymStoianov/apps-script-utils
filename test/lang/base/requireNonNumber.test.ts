import { IllegalArgumentException } from "@/exception";
import { requireNonNumber } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonNumber", () => {
  describe("Correct input data", () => {
    it("should return strings unchanged, including numeric ones", () => {
      expect(requireNonNumber("abc")).toBe("abc");
      expect(requireNonNumber("42")).toBe("42");
    });

    it("should return nil values and booleans unchanged", () => {
      expect(requireNonNumber(null)).toBeNull();
      expect(requireNonNumber(undefined)).toBeUndefined();
      expect(requireNonNumber(false)).toBe(false);
    });

    it("should accept bigints, which are not numbers", () => {
      expect(requireNonNumber(42n)).toBe(42n);
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonNumber(input)).toBe(input);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for numbers", () => {
      expect(() => requireNonNumber(42)).toThrow(IllegalArgumentException);
      expect(() => requireNonNumber(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonNumber(-1.5)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and infinities, which are numbers", () => {
      expect(() => requireNonNumber(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireNonNumber(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonNumber(42)).toThrow("Expected a non-numeric value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonNumber(42, "The key must not be numeric.")).toThrow(
        "The key must not be numeric."
      );
    });
  });
});
