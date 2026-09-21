import { isFunction } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isFunction", () => {
  describe("Correct input data", () => {
    it("should return true for function declarations and expressions", () => {
      expect(isFunction(function named() {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
    });

    it("should return true for arrow functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
    });

    it("should return true for generator and async functions", () => {
      expect(isFunction(function* generator() {})).toBe(true);
      expect(isFunction(async function asyncFn() {})).toBe(true);
    });

    it("should return true for classes and built-in constructors", () => {
      expect(isFunction(class Sample {})).toBe(true);
      expect(isFunction(Array)).toBe(true);
      expect(isFunction(Date)).toBe(true);
      expect(isFunction(Symbol)).toBe(true);
    });

    it("should return true for methods taken off an object", () => {
      const holder = {
        method() {
          return 1;
        }
      };

      expect(isFunction(holder.method)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for nil values", () => {
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });

    it("should return false for primitives", () => {
      expect(isFunction("function")).toBe(false);
      expect(isFunction(0)).toBe(false);
      expect(isFunction(true)).toBe(false);
      expect(isFunction(Symbol("s"))).toBe(false);
    });

    it("should return false for objects that are not callable", () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction(new Date())).toBe(false);
      expect(isFunction(/regexp/)).toBe(false);
      expect(isFunction({ call: () => {}, apply: () => {} })).toBe(false);
    });
  });
});
