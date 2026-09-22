import { IllegalArgumentException } from "@/exception";
import { requireNonLength } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonLength", () => {
  describe("Correct input data", () => {
    it("should return negative and fractional numbers unchanged", () => {
      expect(requireNonLength(-1)).toBe(-1);
      expect(requireNonLength(1.5)).toBe(1.5);
    });

    it("should return values past the safe ceiling unchanged", () => {
      expect(requireNonLength(Number.MAX_SAFE_INTEGER + 2)).toBe(Number.MAX_SAFE_INTEGER + 2);
      expect(requireNonLength(Infinity)).toBe(Infinity);
    });

    it("should return NaN and non-numeric types unchanged", () => {
      expect(requireNonLength(NaN)).toBeNaN();
      expect(requireNonLength("10")).toBe("10");
      expect(requireNonLength(null)).toBeNull();
      expect(requireNonLength([])).toEqual([]);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for valid lengths", () => {
      expect(() => requireNonLength(0)).toThrow(IllegalArgumentException);
      expect(() => requireNonLength(10)).toThrow(IllegalArgumentException);
      expect(() => requireNonLength(Number.MAX_SAFE_INTEGER)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonLength(10)).toThrow(
        "Expected a value that is not a valid array-like length."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonLength(10, "A length was not expected here.")).toThrow(
        "A length was not expected here."
      );
    });
  });
});
