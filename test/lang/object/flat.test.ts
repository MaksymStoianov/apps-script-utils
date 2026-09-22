import { IllegalArgumentException } from "@/exception";
import { flat } from "@/lang";
import { describe, expect, it } from "vitest";

describe("flat", () => {
  describe("Correct input data", () => {
    it("should flatten a nested object to dotted keys", () => {
      expect(flat({ a: { b: { c: 1 } } })).toStrictEqual({ "a.b.c": 1 });
    });

    it("should keep top-level values in place", () => {
      expect(flat({ a: 1, b: "two" })).toStrictEqual({ a: 1, b: "two" });
    });

    it("should flatten several branches", () => {
      expect(flat({ a: { b: 1 }, c: { d: 2 } })).toStrictEqual({ "a.b": 1, "c.d": 2 });
    });

    it("should preserve the order of sibling keys", () => {
      expect(Object.keys(flat({ a: { b: 1 }, c: 2, d: { e: 3 } }))).toStrictEqual([
        "a.b",
        "c",
        "d.e"
      ]);
    });

    it("should copy the object unchanged at depth 0", () => {
      const nested = { b: 1 };

      expect(flat({ a: nested }, 0)).toStrictEqual({ a: nested });
    });

    it("should expand exactly one level at depth 1", () => {
      expect(flat({ a: { b: { c: 1 } } }, 1)).toStrictEqual({ "a.b": { c: 1 } });
    });

    it("should expand every level by default", () => {
      expect(flat({ a: { b: { c: { d: 1 } } } })).toStrictEqual({ "a.b.c.d": 1 });
      expect(flat({ a: { b: { c: { d: 1 } } } }, Infinity)).toStrictEqual({ "a.b.c.d": 1 });
    });

    it("should stop early when there is nothing left to expand", () => {
      expect(flat({ a: { b: 1 } }, 99)).toStrictEqual({ "a.b": 1 });
    });

    it("should keep arrays whole", () => {
      expect(flat({ a: [1, 2] })).toStrictEqual({ a: [1, 2] });
      expect(flat({ a: [{ b: 1 }] })).toStrictEqual({ a: [{ b: 1 }] });
    });

    it("should keep an empty object as a value", () => {
      expect(flat({ a: {}, b: { c: {} } })).toStrictEqual({ "a": {}, "b.c": {} });
    });

    it("should keep null, undefined and other leaves", () => {
      expect(flat({ a: { b: null, c: undefined, d: 0, e: false } })).toStrictEqual({
        "a.b": null,
        "a.c": undefined,
        "a.d": 0,
        "a.e": false
      });
    });

    it("should keep a Date whole", () => {
      const date = new Date(2024, 0, 1);

      expect(flat({ a: date })).toStrictEqual({ a: date });
    });

    it("should join keys that already contain a dot, which does not round-trip", () => {
      expect(flat({ "a.b": { c: 1 } })).toStrictEqual({ "a.b.c": 1 });
    });

    it("should return an empty object for an empty input", () => {
      expect(flat({})).toStrictEqual({});
    });

    it("should leave the original object untouched", () => {
      const source = { a: { b: 1 } };

      flat(source);

      expect(source).toStrictEqual({ a: { b: 1 } });
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when the source is not a non-array object", () => {
      expect(() => flat(null as unknown as object)).toThrow(IllegalArgumentException);
      expect(() => flat(undefined as unknown as object)).toThrow(IllegalArgumentException);
      expect(() => flat([1, 2] as unknown as object)).toThrow(IllegalArgumentException);
      expect(() => flat("text" as unknown as object)).toThrow(IllegalArgumentException);
    });

    it("should throw for a negative or fractional depth", () => {
      expect(() => flat({ a: 1 }, -1)).toThrow(IllegalArgumentException);
      expect(() => flat({ a: 1 }, 1.5)).toThrow(IllegalArgumentException);
      expect(() => flat({ a: 1 }, NaN)).toThrow(IllegalArgumentException);
    });
  });
});
