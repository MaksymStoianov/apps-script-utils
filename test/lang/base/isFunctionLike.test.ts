import { isFunctionLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isFunctionLike", () => {
  describe("Correct input data", () => {
    it("should return true for every callable shape", () => {
      expect(isFunctionLike(() => {})).toBe(true);
      expect(isFunctionLike(function named() {})).toBe(true);
      expect(isFunctionLike(function* generator() {})).toBe(true);
      expect(isFunctionLike(async () => {})).toBe(true);
      expect(isFunctionLike(async function* asyncGenerator() {})).toBe(true);
    });

    it("should return true for classes and built-in constructors", () => {
      expect(isFunctionLike(class Sample {})).toBe(true);
      expect(isFunctionLike(Array)).toBe(true);
      expect(isFunctionLike(Symbol)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for nil values", () => {
      expect(isFunctionLike(null)).toBe(false);
      expect(isFunctionLike(undefined)).toBe(false);
    });

    it("should return false for non-callable objects", () => {
      expect(isFunctionLike({})).toBe(false);
      expect(isFunctionLike([])).toBe(false);
      expect(isFunctionLike(/regexp/)).toBe(false);
      expect(isFunctionLike({ call: () => {} })).toBe(false);
    });

    it("should return false for primitives", () => {
      expect(isFunctionLike("function")).toBe(false);
      expect(isFunctionLike(0)).toBe(false);
    });
  });
});
