import { IllegalArgumentException } from "@/exception";
import { requireNonObject } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonObject", () => {
  describe("Correct input data", () => {
    it("should return primitives unchanged", () => {
      expect(requireNonObject("abc")).toBe("abc");
      expect(requireNonObject(0)).toBe(0);
      expect(requireNonObject(true)).toBe(true);
      expect(requireNonObject(0n)).toBe(0n);
    });

    it('should accept null, despite typeof null being "object"', () => {
      expect(requireNonObject(null)).toBeNull();
      expect(requireNonObject(undefined)).toBeUndefined();
    });

    it("should accept functions", () => {
      const fn = () => 1;

      expect(requireNonObject(fn)).toBe(fn);
      expect(requireNonObject(class Sample {})).toBeTypeOf("function");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for plain objects", () => {
      expect(() => requireNonObject({})).toThrow(IllegalArgumentException);
      expect(() => requireNonObject({ a: 1 })).toThrow(IllegalArgumentException);
    });

    it("should throw for arrays and built-in object types", () => {
      expect(() => requireNonObject([1])).toThrow(IllegalArgumentException);
      expect(() => requireNonObject(new Date())).toThrow(IllegalArgumentException);
      expect(() => requireNonObject(/regexp/)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonObject({})).toThrow("Expected a non-object value.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonObject({}, "A primitive is required here.")).toThrow(
        "A primitive is required here."
      );
    });
  });
});
