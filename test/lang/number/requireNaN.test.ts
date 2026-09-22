import { IllegalArgumentException } from "@/exception";
import { requireNaN } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNaN", () => {
  describe("Correct input data", () => {
    it("should return NaN for the NaN number", () => {
      expect(requireNaN(NaN)).toBeNaN();
      expect(requireNaN(0 / 0)).toBeNaN();
      expect(requireNaN(Number("abc"))).toBeNaN();
      expect(requireNaN(Number.NaN)).toBeNaN();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for ordinary numbers", () => {
      expect(() => requireNaN(0)).toThrow(IllegalArgumentException);
      expect(() => requireNaN(42)).toThrow(IllegalArgumentException);
      expect(() => requireNaN(-1.5)).toThrow(IllegalArgumentException);
    });

    it("should throw for the infinities", () => {
      expect(() => requireNaN(Infinity)).toThrow(IllegalArgumentException);
      expect(() => requireNaN(-Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for values the global isNaN coerces first", () => {
      expect(() => requireNaN("abc")).toThrow(IllegalArgumentException);
      expect(() => requireNaN(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireNaN({})).toThrow(IllegalArgumentException);
    });

    it("should throw for other types", () => {
      expect(() => requireNaN(null)).toThrow(IllegalArgumentException);
      expect(() => requireNaN("NaN")).toThrow(IllegalArgumentException);
      expect(() => requireNaN(42n)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNaN(42)).toThrow("Expected NaN.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNaN(42, "Result must be undefined arithmetic.")).toThrow(
        "Result must be undefined arithmetic."
      );
    });
  });
});
