import { IllegalArgumentException } from "@/exception";
import { requireNonNumberLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonNumberLike", () => {
  describe("Correct input data", () => {
    it("should return non-numeric strings unchanged", () => {
      expect(requireNonNumberLike("abc")).toBe("abc");
      expect(requireNonNumberLike("42px")).toBe("42px");
      expect(requireNonNumberLike("Infinity")).toBe("Infinity");
    });

    it("should accept empty and whitespace-only strings", () => {
      expect(requireNonNumberLike("")).toBe("");
      expect(requireNonNumberLike("   ")).toBe("   ");
    });

    it("should accept NaN and infinities, which are not numeric here", () => {
      expect(requireNonNumberLike(NaN)).toBeNaN();
      expect(requireNonNumberLike(Infinity)).toBe(Infinity);
    });

    it("should accept nil values and other types", () => {
      expect(requireNonNumberLike(null)).toBeNull();
      expect(requireNonNumberLike(undefined)).toBeUndefined();
      expect(requireNonNumberLike(true)).toBe(true);
      expect(requireNonNumberLike({})).toEqual({});
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for finite numbers", () => {
      expect(() => requireNonNumberLike(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonNumberLike(-42)).toThrow(IllegalArgumentException);
      expect(() => requireNonNumberLike(3.14)).toThrow(IllegalArgumentException);
    });

    it("should throw for numeric strings", () => {
      expect(() => requireNonNumberLike("42")).toThrow(IllegalArgumentException);
      expect(() => requireNonNumberLike("  7  ")).toThrow(IllegalArgumentException);
      expect(() => requireNonNumberLike("1e3")).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonNumberLike("42")).toThrow("Expected a non-numeric value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonNumberLike("42", "The label must not look numeric.")).toThrow(
        "The label must not look numeric."
      );
    });
  });
});
