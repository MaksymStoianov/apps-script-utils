import { objectToString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("objectToString", () => {
  describe("Correct input data", () => {
    it("should report the tag of built-in types", () => {
      expect(objectToString({})).toBe("[object Object]");
      expect(objectToString([])).toBe("[object Array]");
      expect(objectToString(new Date())).toBe("[object Date]");
      expect(objectToString(/re/)).toBe("[object RegExp]");
      expect(objectToString(new Map())).toBe("[object Map]");
      expect(objectToString(new Set())).toBe("[object Set]");
    });

    it("should report the tag of primitives", () => {
      expect(objectToString("abc")).toBe("[object String]");
      expect(objectToString(42)).toBe("[object Number]");
      expect(objectToString(true)).toBe("[object Boolean]");
      expect(objectToString(Symbol("s"))).toBe("[object Symbol]");
      expect(objectToString(1n)).toBe("[object BigInt]");
    });

    it("should report the tag of nil values", () => {
      expect(objectToString(null)).toBe("[object Null]");
      expect(objectToString(undefined)).toBe("[object Undefined]");
    });

    it("should report the tag of callables", () => {
      expect(objectToString(() => {})).toBe("[object Function]");
      expect(objectToString(function* generator() {})).toBe("[object GeneratorFunction]");
      expect(objectToString(async () => {})).toBe("[object AsyncFunction]");
    });
  });

  describe("Proxies are transparent", () => {
    it("should report the tag of the target, not of the proxy", () => {
      expect(objectToString(new Proxy({}, {}))).toBe("[object Object]");
      expect(objectToString(new Proxy(() => {}, {}))).toBe("[object Function]");
    });
  });
});
