import { nonObjectLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonObjectLike", () => {
  describe("Correct input data", () => {
    it("should return false for plain objects and arrays", () => {
      expect(nonObjectLike({})).toBe(false);
      expect(nonObjectLike({ a: 1 })).toBe(false);
      expect(nonObjectLike([])).toBe(false);
    });

    it("should return false for built-in object types", () => {
      expect(nonObjectLike(new Date())).toBe(false);
      expect(nonObjectLike(/regexp/)).toBe(false);
      expect(nonObjectLike(new Map())).toBe(false);
    });

    it("should return false for functions, unlike nonObject", () => {
      expect(nonObjectLike(() => {})).toBe(false);
      expect(nonObjectLike(function named() {})).toBe(false);
      expect(nonObjectLike(class Sample {})).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for null and undefined", () => {
      expect(nonObjectLike(null)).toBe(true);
      expect(nonObjectLike(undefined)).toBe(true);
    });

    it("should return true for primitives", () => {
      expect(nonObjectLike("object")).toBe(true);
      expect(nonObjectLike(0)).toBe(true);
      expect(nonObjectLike(true)).toBe(true);
      expect(nonObjectLike(Symbol("s"))).toBe(true);
      expect(nonObjectLike(0n)).toBe(true);
    });
  });
});
