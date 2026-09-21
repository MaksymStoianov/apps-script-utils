import { nonObject } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonObject", () => {
  describe("Correct input data", () => {
    it("should return false for plain objects", () => {
      expect(nonObject({})).toBe(false);
      expect(nonObject({ a: 1 })).toBe(false);
      expect(nonObject(Object.create(null))).toBe(false);
    });

    it("should return false for arrays and built-in object types", () => {
      expect(nonObject([])).toBe(false);
      expect(nonObject(new Date())).toBe(false);
      expect(nonObject(/regexp/)).toBe(false);
      expect(nonObject(new Map())).toBe(false);
      expect(nonObject(new Error("boom"))).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for null and undefined", () => {
      expect(nonObject(null)).toBe(true);
      expect(nonObject(undefined)).toBe(true);
    });

    it("should return true for primitives", () => {
      expect(nonObject("object")).toBe(true);
      expect(nonObject(0)).toBe(true);
      expect(nonObject(true)).toBe(true);
      expect(nonObject(Symbol("s"))).toBe(true);
      expect(nonObject(0n)).toBe(true);
    });

    it("should return true for functions", () => {
      expect(nonObject(() => {})).toBe(true);
      expect(nonObject(class Sample {})).toBe(true);
    });
  });
});
