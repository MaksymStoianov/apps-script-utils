import { IllegalArgumentException } from "@/exception";
import { requireObject } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireObject", () => {
  describe("Correct input data", () => {
    it("should return the same object reference", () => {
      const input = { a: 1 };

      expect(requireObject(input)).toBe(input);
    });

    it("should accept empty and null-prototype objects", () => {
      expect(requireObject({})).toEqual({});
      expect(requireObject(Object.create(null))).toBeTruthy();
    });

    it("should accept arrays and built-in object types", () => {
      expect(requireObject([])).toEqual([]);
      expect(requireObject(new Date())).toBeInstanceOf(Date);
      expect(requireObject(new Map())).toBeInstanceOf(Map);
      expect(requireObject(/regexp/)).toBeInstanceOf(RegExp);
    });
  });

  describe("Incorrect input data", () => {
    it('should throw for null, despite typeof null being "object"', () => {
      expect(() => requireObject(null)).toThrow(IllegalArgumentException);
    });

    it("should throw for undefined", () => {
      expect(() => requireObject(undefined)).toThrow(IllegalArgumentException);
    });

    it("should throw for functions", () => {
      expect(() => requireObject(() => {})).toThrow(IllegalArgumentException);
      expect(() => requireObject(class Sample {})).toThrow(IllegalArgumentException);
    });

    it("should throw for primitives", () => {
      expect(() => requireObject("object")).toThrow(IllegalArgumentException);
      expect(() => requireObject(0)).toThrow(IllegalArgumentException);
      expect(() => requireObject(true)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireObject(null)).toThrow("Expected an object.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireObject(null, "Options must be an object.")).toThrow(
        "Options must be an object."
      );
    });
  });
});
