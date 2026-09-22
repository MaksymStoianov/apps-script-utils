import { IllegalArgumentException } from "@/exception";
import { requireNonNaN } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonNaN", () => {
  describe("Correct input data", () => {
    it("should return the value unchanged for ordinary numbers", () => {
      expect(requireNonNaN(0)).toBe(0);
      expect(requireNonNaN(42)).toBe(42);
      expect(requireNonNaN(-1.5)).toBe(-1.5);
    });

    it("should accept the infinities", () => {
      expect(requireNonNaN(Infinity)).toBe(Infinity);
      expect(requireNonNaN(-Infinity)).toBe(-Infinity);
    });

    it("should accept values the global isNaN coerces first", () => {
      expect(requireNonNaN("abc")).toBe("abc");
      expect(requireNonNaN(undefined)).toBeUndefined();
    });

    it("should accept other types", () => {
      expect(requireNonNaN(null)).toBeNull();
      expect(requireNonNaN("NaN")).toBe("NaN");
      expect(requireNonNaN(42n)).toBe(42n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for the NaN number", () => {
      expect(() => requireNonNaN(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireNonNaN(0 / 0)).toThrow(IllegalArgumentException);
      expect(() => requireNonNaN(Number("abc"))).toThrow(IllegalArgumentException);
      expect(() => requireNonNaN(Number.NaN)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonNaN(NaN)).toThrow("Expected a value that is not NaN.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonNaN(NaN, "Total did not parse as a number.")).toThrow(
        "Total did not parse as a number."
      );
    });
  });
});
