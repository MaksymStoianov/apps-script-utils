import { IllegalArgumentException } from "@/exception";
import { requireFunctionLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireFunctionLike", () => {
  describe("Correct input data", () => {
    it("should return the same function reference", () => {
      const input = () => 1;

      expect(requireFunctionLike(input)).toBe(input);
    });

    it("should accept every callable shape", () => {
      expect(requireFunctionLike(function named() {})).toBeTypeOf("function");
      expect(requireFunctionLike(function* generator() {})).toBeTypeOf("function");
      expect(requireFunctionLike(async () => {})).toBeTypeOf("function");
      expect(requireFunctionLike(async function* asyncGenerator() {})).toBeTypeOf("function");
      expect(requireFunctionLike(class Sample {})).toBeTypeOf("function");
      expect(requireFunctionLike(Array)).toBe(Array);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for nil values", () => {
      expect(() => requireFunctionLike(null)).toThrow(IllegalArgumentException);
      expect(() => requireFunctionLike(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-callable objects", () => {
      expect(() => requireFunctionLike({})).toThrow(IllegalArgumentException);
      expect(() => requireFunctionLike([])).toThrow(IllegalArgumentException);
      expect(() => requireFunctionLike(/regexp/)).toThrow(IllegalArgumentException);
    });

    it("should throw for primitives", () => {
      expect(() => requireFunctionLike("fn")).toThrow(IllegalArgumentException);
      expect(() => requireFunctionLike(0)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireFunctionLike("fn")).toThrow("Expected a function.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireFunctionLike("fn", "A handler is required.")).toThrow(
        "A handler is required."
      );
    });
  });
});
