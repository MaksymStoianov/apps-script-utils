import { IllegalArgumentException } from "@/exception";
import { requireNonFunction } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonFunction", () => {
  describe("Correct input data", () => {
    it("should return primitives unchanged", () => {
      expect(requireNonFunction(42)).toBe(42);
      expect(requireNonFunction("fn")).toBe("fn");
      expect(requireNonFunction(false)).toBe(false);
    });

    it("should return nil values unchanged", () => {
      expect(requireNonFunction(null)).toBeNull();
      expect(requireNonFunction(undefined)).toBeUndefined();
    });

    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireNonFunction(input)).toBe(input);
    });

    it("should accept an object carrying a call property", () => {
      const lookalike = { call: () => {}, apply: () => {} };

      expect(requireNonFunction(lookalike)).toBe(lookalike);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for every callable shape", () => {
      expect(() => requireNonFunction(() => {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunction(function named() {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunction(function* generator() {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunction(async () => {})).toThrow(IllegalArgumentException);
    });

    it("should throw for classes and built-in constructors", () => {
      expect(() => requireNonFunction(class Sample {})).toThrow(IllegalArgumentException);
      expect(() => requireNonFunction(Array)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonFunction(() => {})).toThrow("Expected a non-function value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonFunction(() => {}, "A value was expected, not a callback.")).toThrow(
        "A value was expected, not a callback."
      );
    });
  });
});
