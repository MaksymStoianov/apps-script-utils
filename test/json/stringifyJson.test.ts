import { stringifyJson } from "@/json";
import { describe, expect, it } from "vitest";

describe("stringifyJson", () => {
  describe("Correct input data", () => {
    it("should stringify primitives", () => {
      expect(stringifyJson(42)).toBe("42");
      expect(stringifyJson("abc")).toBe('"abc"');
      expect(stringifyJson(true)).toBe("true");
      expect(stringifyJson(null)).toBe("null");
    });

    it("should stringify arrays, preserving order", () => {
      expect(stringifyJson([3, 1])).toBe("[3,1]");
      expect(stringifyJson([])).toBe("[]");
    });

    it("should stringify nested structures", () => {
      expect(stringifyJson({ a: [1, { b: 2 }] })).toBe('{"a":[1,{"b":2}]}');
    });
  });

  describe("Stability", () => {
    it("should produce the same string for the same value", () => {
      expect(stringifyJson({ a: 1, b: 2 })).toBe(stringifyJson({ a: 1, b: 2 }));
    });

    it("should produce the same string regardless of key insertion order", () => {
      expect(stringifyJson({ a: 1, b: 2 })).toBe(stringifyJson({ b: 2, a: 1 }));
    });

    it("should be stable for nested objects too", () => {
      expect(stringifyJson({ z: { x: 1, y: 2 } })).toBe(stringifyJson({ z: { y: 2, x: 1 } }));
    });
  });

  describe("Values JSON cannot represent", () => {
    it("should return undefined for a function, despite the declared string return", () => {
      expect(stringifyJson(() => {})).toBeUndefined();
    });

    it("should return undefined for undefined", () => {
      expect(stringifyJson(undefined)).toBeUndefined();
    });
  });
});
