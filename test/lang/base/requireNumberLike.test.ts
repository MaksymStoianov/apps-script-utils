import { IllegalArgumentException } from "@/exception";
import { requireNumberLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNumberLike", () => {
  describe("Correct input data", () => {
    it("should return finite numbers unchanged", () => {
      expect(requireNumberLike(0)).toBe(0);
      expect(requireNumberLike(-42)).toBe(-42);
      expect(requireNumberLike(3.14)).toBe(3.14);
    });

    it("should return numeric strings without converting them", () => {
      expect(requireNumberLike("42")).toBe("42");
      expect(requireNumberLike("-3.14")).toBe("-3.14");
      expect(requireNumberLike("  7  ")).toBe("  7  ");
      expect(requireNumberLike("1e3")).toBe("1e3");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for NaN and infinities", () => {
      expect(() => requireNumberLike(NaN)).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike(Infinity)).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike(-Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for empty and partially numeric strings", () => {
      expect(() => requireNumberLike("")).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike("   ")).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike("42px")).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike("Infinity")).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values and other types", () => {
      expect(() => requireNumberLike(null)).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike(true)).toThrow(IllegalArgumentException);
      expect(() => requireNumberLike([])).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNumberLike("42px")).toThrow("Expected a numeric value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNumberLike("42px", "The cell must hold a number.")).toThrow(
        "The cell must hold a number."
      );
    });
  });
});
