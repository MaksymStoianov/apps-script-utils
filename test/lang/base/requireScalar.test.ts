import { IllegalArgumentException } from "@/exception";
import { requireScalar } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireScalar", () => {
  describe("Correct input data", () => {
    it("should return strings unchanged", () => {
      expect(requireScalar("abc")).toBe("abc");
      expect(requireScalar("")).toBe("");
    });

    it("should return numbers unchanged", () => {
      expect(requireScalar(0)).toBe(0);
      expect(requireScalar(-1.5)).toBe(-1.5);
      expect(requireScalar(NaN)).toBeNaN();
    });

    it("should return booleans unchanged", () => {
      expect(requireScalar(true)).toBe(true);
      expect(requireScalar(false)).toBe(false);
    });

    it("should accept symbols and bigints", () => {
      const symbol = Symbol("s");

      expect(requireScalar(symbol)).toBe(symbol);
      expect(requireScalar(1n)).toBe(1n);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for nil values", () => {
      expect(() => requireScalar(null)).toThrow(IllegalArgumentException);
      expect(() => requireScalar(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for objects, arrays and functions", () => {
      expect(() => requireScalar({})).toThrow(IllegalArgumentException);
      expect(() => requireScalar([])).toThrow(IllegalArgumentException);
      expect(() => requireScalar(["abc"])).toThrow(IllegalArgumentException);
      expect(() => requireScalar(() => {})).toThrow(IllegalArgumentException);
      expect(() => requireScalar(new Date())).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireScalar(null)).toThrow("Expected a scalar value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireScalar(null, "Cell value must be a primitive.")).toThrow(
        "Cell value must be a primitive."
      );
    });
  });
});
