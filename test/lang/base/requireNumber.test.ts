import { IllegalArgumentException } from "@/exception";
import { requireNumber } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNumber", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for numbers", () => {
      expect(requireNumber(0)).toBe(0);
      expect(requireNumber(42)).toBe(42);
      expect(requireNumber(-1.5)).toBe(-1.5);
    });

    it("should accept NaN and infinities, which are numbers", () => {
      expect(requireNumber(NaN)).toBeNaN();
      expect(requireNumber(Infinity)).toBe(Infinity);
      expect(requireNumber(-Infinity)).toBe(-Infinity);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for numeric strings", () => {
      expect(() => requireNumber("42")).toThrow(IllegalArgumentException);
      expect(() => requireNumber("")).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values", () => {
      expect(() => requireNumber(null)).toThrow(IllegalArgumentException);
      expect(() => requireNumber(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for other types", () => {
      expect(() => requireNumber(true)).toThrow(IllegalArgumentException);
      expect(() => requireNumber(42n)).toThrow(IllegalArgumentException);
      expect(() => requireNumber([42])).toThrow(IllegalArgumentException);
      expect(() => requireNumber({})).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNumber("42")).toThrow("Expected a number.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNumber("42", "Width must be numeric.")).toThrow("Width must be numeric.");
    });
  });
});
