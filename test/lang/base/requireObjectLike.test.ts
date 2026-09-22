import { IllegalArgumentException } from "@/exception";
import { requireObjectLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireObjectLike", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireObjectLike(input)).toBe(input);
    });

    it("should accept arrays and built-in object types", () => {
      expect(requireObjectLike([])).toEqual([]);
      expect(requireObjectLike(new Date())).toBeInstanceOf(Date);
      expect(requireObjectLike(/regexp/)).toBeInstanceOf(RegExp);
    });

    it("should accept functions, unlike requireObject", () => {
      const fn = (): number => 1;

      expect(requireObjectLike(fn)).toBe(fn);
      expect(requireObjectLike(class Sample {})).toBeTypeOf("function");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for nil values", () => {
      expect(() => requireObjectLike(null)).toThrow(IllegalArgumentException);
      expect(() => requireObjectLike(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for primitives", () => {
      expect(() => requireObjectLike("abc")).toThrow(IllegalArgumentException);
      expect(() => requireObjectLike(0)).toThrow(IllegalArgumentException);
      expect(() => requireObjectLike(true)).toThrow(IllegalArgumentException);
      expect(() => requireObjectLike(Symbol("s"))).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireObjectLike(null)).toThrow("Expected an object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireObjectLike(null, "A target object is required.")).toThrow(
        "A target object is required."
      );
    });
  });
});
