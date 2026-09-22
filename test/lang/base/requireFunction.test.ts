import { IllegalArgumentException } from "@/exception";
import { requireFunction } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireFunction", () => {
  describe("Correct input data", () => {
    it("should return the same function reference", () => {
      const input = (): number => 1;

      expect(requireFunction(input)).toBe(input);
    });

    it("should accept declarations, generators and async functions", () => {
      expect(requireFunction(function named() {})).toBeTypeOf("function");
      expect(requireFunction(function* generator() {})).toBeTypeOf("function");
      expect(requireFunction(async () => {})).toBeTypeOf("function");
    });

    it("should accept classes and built-in constructors", () => {
      expect(requireFunction(class Sample {})).toBeTypeOf("function");
      expect(requireFunction(Array)).toBe(Array);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for nil values", () => {
      expect(() => requireFunction(null)).toThrow(IllegalArgumentException);
      expect(() => requireFunction(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-callable objects", () => {
      expect(() => requireFunction({})).toThrow(IllegalArgumentException);
      expect(() => requireFunction([])).toThrow(IllegalArgumentException);
      expect(() => requireFunction({ call: () => {} })).toThrow(IllegalArgumentException);
    });

    it("should throw for primitives", () => {
      expect(() => requireFunction("fn")).toThrow(IllegalArgumentException);
      expect(() => requireFunction(0)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireFunction("fn")).toThrow("Expected a function.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireFunction("fn", "A callback is required.")).toThrow(
        "A callback is required."
      );
    });
  });
});
