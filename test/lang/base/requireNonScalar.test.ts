import { IllegalArgumentException } from "@/exception";
import { requireNonScalar } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonScalar", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonScalar(input)).toBe(input);
    });

    it("should accept arrays and built-in object types", () => {
      expect(requireNonScalar([1, 2])).toEqual([1, 2]);
      expect(requireNonScalar(new Date())).toBeInstanceOf(Date);
      expect(requireNonScalar(new Map())).toBeInstanceOf(Map);
    });

    it("should accept nil values, which are not scalars", () => {
      expect(requireNonScalar(null)).toBeNull();
      expect(requireNonScalar(undefined)).toBeUndefined();
    });

    it("should accept functions", () => {
      const fn = () => 1;

      expect(requireNonScalar(fn)).toBe(fn);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for strings, numbers and booleans", () => {
      expect(() => requireNonScalar("abc")).toThrow(IllegalArgumentException);
      expect(() => requireNonScalar("")).toThrow(IllegalArgumentException);
      expect(() => requireNonScalar(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonScalar(false)).toThrow(IllegalArgumentException);
    });

    it("should throw for symbols and bigints", () => {
      expect(() => requireNonScalar(Symbol("s"))).toThrow(IllegalArgumentException);
      expect(() => requireNonScalar(1n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonScalar("abc")).toThrow("Expected a non-scalar value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonScalar("abc", "A structured value is required.")).toThrow(
        "A structured value is required."
      );
    });
  });
});
