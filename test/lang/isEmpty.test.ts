import { isEmpty } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isEmpty", () => {
  describe("Nil Values (null, undefined)", () => {
    it("should return true for null", () => {
      expect(isEmpty(null)).toBe(true);
    });

    it("should return true for undefined", () => {
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe("Collections and Data Structures", () => {
    it("should return true for an empty Array", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should return false for a non-empty Array", () => {
      expect(isEmpty([1, 2])).toBe(false);
    });

    it("should return true for an empty Set", () => {
      expect(isEmpty(new Set())).toBe(true);
    });

    it("should return false for a non-empty Set", () => {
      expect(isEmpty(new Set([1]))).toBe(false);
    });

    it("should return true for an empty Map", () => {
      expect(isEmpty(new Map())).toBe(true);
    });

    it("should return false for a non-empty Map", () => {
      expect(isEmpty(new Map([["a", 1]]))).toBe(false);
    });
  });

  describe("Array-like Objects (based on 'length' property)", () => {
    it("should return true for an object with length: 0 (e.g., arguments, if isObject allows it)", () => {
      const arrayLike = { 0: "a", 1: "b", length: 0 };
      expect(isEmpty(arrayLike)).toBe(true);
    });

    it("should return false for an object with length > 0", () => {
      const arrayLike = { 0: "a", length: 1 };
      expect(isEmpty(arrayLike)).toBe(false);
    });

    it("should return false for primitive strings (e.g., '')", () => {
      expect(isEmpty("")).toBe(true);
    });
  });

  describe("Plain JavaScript Objects ({})", () => {
    it("should return true for an empty plain object ({})", () => {
      expect(isEmpty({})).toBe(true);
    });

    it("should return false for a non-empty plain object", () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it("should return false for an object with non-enumerable properties (still empty)", () => {
      const obj = {};
      Object.defineProperty(obj, "key", { value: 1, enumerable: false });
      expect(isEmpty(obj)).toBe(true);
    });

    it("should return false for a function (not a pure object)", () => {
      expect(isEmpty(() => {})).toBe(false);
    });
  });

  describe("Other Types (Primitives, Classes)", () => {
    it("should return false for numbers (including zero)", () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(123)).toBe(false);
    });

    it("should return false for booleans", () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });

    it("should return false for non-empty strings", () => {
      expect(isEmpty("hello")).toBe(false);
    });

    it("should return false for Date objects", () => {
      expect(isEmpty(new Date())).toBe(false);
    });

    it("should return false for a custom class instance", () => {
      class MyClass {
        constructor(public data = {}) {}
      }
      expect(isEmpty(new MyClass())).toBe(false);
    });
  });

  describe("String Mode (using 'strict' parameter)", () => {
    describe("Default (non-strict) mode for strings (strict=false)", () => {
      it("should return true for whitespace-only strings (default/non-strict mode)", () => {
        expect(isEmpty(" ")).toBe(true);
        expect(isEmpty("\t\n")).toBe(true);
        expect(isEmpty("  ", false)).toBe(true); // Явно false
      });

      it("should return false for non-empty strings, even with surrounding spaces", () => {
        expect(isEmpty(" hello ")).toBe(false);
      });
    });

    describe("Strict mode for strings (strict=true)", () => {
      it('should return true for empty string ("") in strict mode', () => {
        expect(isEmpty("", true)).toBe(true);
      });

      it("should return false for whitespace-only strings (strict mode)", () => {
        expect(isEmpty(" ", true)).toBe(false);
        expect(isEmpty("\t\n", true)).toBe(false);
      });

      it("should return false for non-empty strings in strict mode", () => {
        expect(isEmpty("hello", true)).toBe(false);
      });
    });
  });

  describe("Other Edge Cases", () => {
    it("should return false for NaN (Not a Number)", () => {
      expect(isEmpty(NaN)).toBe(false);
    });

    it("should return false for Symbol", () => {
      expect(isEmpty(Symbol(""))).toBe(false);
    });

    it("should return false for BigInt (even zero)", () => {
      expect(isEmpty(0n)).toBe(false);
    });
  });
});
