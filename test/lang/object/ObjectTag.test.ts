import { ObjectTag, objectToString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("ObjectTag", () => {
  describe("Values", () => {
    it("should hold the Object#toString form", () => {
      expect(ObjectTag.OBJECT).toBe("[object Object]");
      expect(ObjectTag.ARRAY).toBe("[object Array]");
      expect(ObjectTag.NULL).toBe("[object Null]");
      expect(ObjectTag.UNDEFINED).toBe("[object Undefined]");
    });
  });

  describe("Agreement with objectToString", () => {
    it("should match what the runtime actually reports", () => {
      const cases: Array<[unknown, string]> = [
        [{}, ObjectTag.OBJECT],
        [[], ObjectTag.ARRAY],
        [null, ObjectTag.NULL],
        [undefined, ObjectTag.UNDEFINED],
        [new Date(), ObjectTag.DATE],
        [/re/, ObjectTag.REG_EXP],
        [new Map(), ObjectTag.MAP],
        [new Set(), ObjectTag.SET],
        ["abc", ObjectTag.STRING],
        [42, ObjectTag.NUMBER],
        [true, ObjectTag.BOOLEAN],
        [Symbol("s"), ObjectTag.SYMBOL],
        [() => {}, ObjectTag.FUNCTION],
        [function* generator() {}, ObjectTag.GENERATOR_FUNCTION],
        [async () => {}, ObjectTag.ASYNC_FUNCTION],
        [new Error("boom"), ObjectTag.ERROR],
        [Promise.resolve(), ObjectTag.PROMISE],
        [new WeakMap(), ObjectTag.WEAK_MAP],
        [new WeakSet(), ObjectTag.WEAK_SET],
        [new ArrayBuffer(1), ObjectTag.ARRAY_BUFFER]
      ];

      for (const [value, tag] of cases) {
        expect(objectToString(value)).toBe(tag);
      }
    });
  });

  describe("Uniqueness", () => {
    it("should have no duplicate values", () => {
      const values = Object.values(ObjectTag);

      expect(new Set(values).size).toBe(values.length);
    });
  });
});
