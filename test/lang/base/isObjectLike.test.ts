import { isObjectLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isObjectLike", () => {
  describe("Correct input data", () => {
    it("should return true for plain objects and arrays", () => {
      expect(isObjectLike({})).toBe(true);
      expect(isObjectLike({ a: 1 })).toBe(true);
      expect(isObjectLike([])).toBe(true);
    });

    it("should return true for built-in object types", () => {
      expect(isObjectLike(new Date())).toBe(true);
      expect(isObjectLike(/regexp/)).toBe(true);
      expect(isObjectLike(new Map())).toBe(true);
    });

    it("should return true for functions, unlike isObject", () => {
      expect(isObjectLike(() => {})).toBe(true);
      expect(isObjectLike(function named() {})).toBe(true);
      expect(isObjectLike(class Sample {})).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for nil values", () => {
      expect(isObjectLike(null)).toBe(false);
      expect(isObjectLike(undefined)).toBe(false);
    });

    it("should return false for primitives", () => {
      expect(isObjectLike("object")).toBe(false);
      expect(isObjectLike(0)).toBe(false);
      expect(isObjectLike(true)).toBe(false);
      expect(isObjectLike(Symbol("s"))).toBe(false);
    });
  });
});
