import { nonFunctionLike } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonFunctionLike", () => {
  describe("Correct input data", () => {
    it("should return false for function declarations and expressions", () => {
      expect(nonFunctionLike(function named() {})).toBe(false);
      expect(nonFunctionLike(() => {})).toBe(false);
    });

    it("should return false for generator and async functions", () => {
      expect(nonFunctionLike(function* generator() {})).toBe(false);
      expect(nonFunctionLike(async () => {})).toBe(false);
    });

    it("should return false for classes and built-in constructors", () => {
      expect(nonFunctionLike(class Sample {})).toBe(false);
      expect(nonFunctionLike(Array)).toBe(false);
      expect(nonFunctionLike(Symbol)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for nil values", () => {
      expect(nonFunctionLike(null)).toBe(true);
      expect(nonFunctionLike(undefined)).toBe(true);
    });

    it("should return true for primitives", () => {
      expect(nonFunctionLike("function")).toBe(true);
      expect(nonFunctionLike(0)).toBe(true);
      expect(nonFunctionLike(true)).toBe(true);
    });

    it("should return true for objects that are not callable", () => {
      expect(nonFunctionLike({})).toBe(true);
      expect(nonFunctionLike([])).toBe(true);
      expect(nonFunctionLike(new Date())).toBe(true);
      expect(nonFunctionLike(/regexp/)).toBe(true);
    });
  });
});
