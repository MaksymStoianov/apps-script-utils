import { IllegalArgumentException } from "@/exception";
import { requireCountable } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireCountable", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for non-negative safe integers", () => {
      expect(requireCountable(0)).toBe(0);
      expect(requireCountable(1)).toBe(1);
      expect(requireCountable(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should accept negative zero", () => {
      expect(requireCountable(-0)).toBe(-0);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for negative numbers", () => {
      expect(() => requireCountable(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw for fractions", () => {
      expect(() => requireCountable(1.5)).toThrow(IllegalArgumentException);
    });

    it("should throw beyond the safe integer range", () => {
      expect(() => requireCountable(Number.MAX_SAFE_INTEGER + 2)).toThrow(IllegalArgumentException);
      expect(() => requireCountable(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN and non-numeric types", () => {
      expect(() => requireCountable(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireCountable("1")).toThrow(IllegalArgumentException);
      expect(() => requireCountable(null)).toThrow(IllegalArgumentException);
      expect(() => requireCountable(undefined)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireCountable(-1)).toThrow("Expected a non-negative safe integer.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireCountable(-1, "Row count cannot be negative.")).toThrow(
        "Row count cannot be negative."
      );
    });
  });
});
