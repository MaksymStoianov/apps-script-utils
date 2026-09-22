import { isObject } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isObject", () => {
  describe("Correct input data", () => {
    it("should return true for plain objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject(Object.create(null))).toBe(true);
    });

    it("should return true for arrays and built-in object types", () => {
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject(/regexp/)).toBe(true);
      expect(isObject(new Map())).toBe(true);
      expect(isObject(new Error("boom"))).toBe(true);
    });

    it("should return true for boxed primitives", () => {
      expect(isObject(new String("abc"))).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for null, despite its typeof being object", () => {
      expect(isObject(null)).toBe(false);
    });

    it("should return false for functions", () => {
      expect(isObject(() => {})).toBe(false);
      expect(isObject(class Sample {})).toBe(false);
    });

    it("should return false for undefined and primitives", () => {
      expect(isObject(undefined)).toBe(false);
      expect(isObject("abc")).toBe(false);
      expect(isObject(0)).toBe(false);
      expect(isObject(Symbol("s"))).toBe(false);
    });
  });
});
