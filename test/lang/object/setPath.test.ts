import { IllegalArgumentException } from "@/exception";
import { getPath, setPath } from "@/lang";
import { describe, expect, it } from "vitest";

describe("setPath", () => {
  describe("Correct input data", () => {
    it("should write a nested value, creating the missing levels", () => {
      expect(setPath({}, "a.b.c", 1)).toStrictEqual({ a: { b: { c: 1 } } });
    });

    it("should write by an array path", () => {
      expect(setPath({}, ["a", "b"], 1)).toStrictEqual({ a: { b: 1 } });
    });

    it("should write a top-level key", () => {
      expect(setPath({}, "a", 1)).toStrictEqual({ a: 1 });
    });

    it("should return the target itself", () => {
      const target = {};

      expect(setPath(target, "a", 1)).toBe(target);
    });

    it("should overwrite an existing value", () => {
      expect(setPath({ a: { b: 1 } }, "a.b", 2)).toStrictEqual({ a: { b: 2 } });
    });

    it("should keep the sibling keys of a level it descends through", () => {
      expect(setPath({ a: { keep: 1 } }, "a.b", 2)).toStrictEqual({ a: { keep: 1, b: 2 } });
    });

    it("should replace a primitive level with a container", () => {
      expect(setPath({ a: 1 }, "a.b", 2)).toStrictEqual({ a: { b: 2 } });
      expect(setPath({ a: null }, "a.b", 2)).toStrictEqual({ a: { b: 2 } });
    });

    it("should create an array when the next segment is a number", () => {
      const result = setPath({}, ["a", 0, "b"], 1) as { a: unknown };

      expect(Array.isArray(result.a)).toBe(true);
      expect(result).toStrictEqual({ a: [{ b: 1 }] });
    });

    it("should create plain objects for a dotted path, where every segment is a string", () => {
      const result = setPath({}, "a.0.b", 1) as { a: unknown };

      expect(Array.isArray(result.a)).toBe(false);
      expect(result).toStrictEqual({ a: { 0: { b: 1 } } });
    });

    it("should write into an existing array", () => {
      expect(setPath({ a: [1, 2] }, ["a", 1], 9)).toStrictEqual({ a: [1, 9] });
    });

    it("should write falsy values", () => {
      expect(setPath({}, "a", 0)).toStrictEqual({ a: 0 });
      expect(setPath({}, "a", null)).toStrictEqual({ a: null });
      expect(setPath({}, "a", undefined)).toStrictEqual({ a: undefined });
    });

    it("should round-trip with getPath", () => {
      const target = setPath({}, "a.b.c", "value");

      expect(getPath(target, "a.b.c")).toBe("value");
    });
  });

  describe("Prototype pollution", () => {
    it("should refuse to write through __proto__", () => {
      expect(() => setPath({}, "__proto__.polluted", true)).toThrow(IllegalArgumentException);
      expect(() => setPath({}, ["__proto__", "polluted"], true)).toThrow(IllegalArgumentException);
    });

    it("should refuse to write through constructor", () => {
      expect(() => setPath({}, "constructor.prototype.polluted", true)).toThrow(
        IllegalArgumentException
      );
    });

    it("should refuse to write through prototype", () => {
      expect(() => setPath({}, "a.prototype.polluted", true)).toThrow(IllegalArgumentException);
    });

    it("should refuse a blocked key as the leaf too", () => {
      expect(() => setPath({}, "a.__proto__", true)).toThrow(IllegalArgumentException);
    });

    it("should leave Object.prototype untouched", () => {
      expect(() => setPath({}, "__proto__.polluted", true)).toThrow(IllegalArgumentException);

      expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the path names no segments", () => {
      expect(() => setPath({}, [], 1)).toThrow(IllegalArgumentException);
    });

    it("should throw when the target is not an object", () => {
      expect(() => setPath(null as unknown as object, "a", 1)).toThrow(IllegalArgumentException);
      expect(() => setPath(undefined as unknown as object, "a", 1)).toThrow(
        IllegalArgumentException
      );
      expect(() => setPath(42 as unknown as object, "a", 1)).toThrow(IllegalArgumentException);
      expect(() => setPath("text" as unknown as object, "a", 1)).toThrow(IllegalArgumentException);
    });
  });
});
