import { IllegalArgumentException } from "@/exception";
import { requireNonObjectLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonObjectLike", () => {
  describe("Correct input data", () => {
    it("should return primitives unchanged", () => {
      expect(requireNonObjectLike("abc")).toBe("abc");
      expect(requireNonObjectLike(0)).toBe(0);
      expect(requireNonObjectLike(true)).toBe(true);
      expect(requireNonObjectLike(0n)).toBe(0n);
    });

    it("should accept symbols", () => {
      const symbol = Symbol("s");

      expect(requireNonObjectLike(symbol)).toBe(symbol);
    });

    it("should accept nil values", () => {
      expect(requireNonObjectLike(null)).toBeNull();
      expect(requireNonObjectLike(undefined)).toBeUndefined();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for plain objects and arrays", () => {
      expect(() => requireNonObjectLike({})).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike({ a: 1 })).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike([])).toThrow(IllegalArgumentException);
    });

    it("should throw for built-in object types", () => {
      expect(() => requireNonObjectLike(new Date())).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike(/regexp/)).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike(new Map())).toThrow(IllegalArgumentException);
    });

    it("should throw for functions, unlike requireNonObject", () => {
      expect(() => requireNonObjectLike(() => {})).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike(class Sample {})).toThrow(IllegalArgumentException);
      expect(() => requireNonObjectLike(Array)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonObjectLike({})).toThrow("Expected a non-object value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonObjectLike({}, "A primitive is required here.")).toThrow(
        "A primitive is required here."
      );
    });
  });
});
