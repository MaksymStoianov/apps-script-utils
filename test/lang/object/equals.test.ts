import { Class, equals } from "@/lang";
import { describe, expect, it } from "vitest";

describe("equals", () => {
  describe("Correct input data", () => {
    it("should treat any value as equal to itself, including NaN", () => {
      for (const value of [
        0,
        1,
        "a",
        true,
        null,
        undefined,
        NaN,
        Symbol("s"),
        10n,
        {},
        [],
        () => {}
      ]) {
        expect(equals(value, value)).toBe(true);
      }
    });

    it("should treat +0 and -0 as equal", () => {
      expect(equals(0, -0)).toBe(true);
      expect(equals([0], [-0])).toBe(true);
    });

    it("should compare primitives by value", () => {
      expect(equals("a", "a")).toBe(true);
      expect(equals(1, 1)).toBe(true);
      expect(equals(true, true)).toBe(true);
      expect(equals(10n, 10n)).toBe(true);
    });

    it("should compare arrays by length and element, recursively", () => {
      expect(equals([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
      expect(equals([], [])).toBe(true);
    });

    it("should compare typed arrays by element", () => {
      expect(equals(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toBe(true);
    });

    it("should compare plain objects by keys and values in any order", () => {
      expect(equals({ a: 1, b: { c: [2] } }, { b: { c: [2] }, a: 1 })).toBe(true);
      expect(equals({}, {})).toBe(true);
    });

    it("should compare dates by instant", () => {
      expect(equals(new Date(0), new Date(0))).toBe(true);
      expect(equals(new Date(NaN), new Date(NaN))).toBe(true);
    });

    it("should compare regular expressions by source and flags", () => {
      expect(equals(/a+/gi, /a+/gi)).toBe(true);
    });

    it("should compare boxed primitives by value", () => {
      expect(equals(new Number(1), new Number(1))).toBe(true);
      expect(equals(new String("a"), new String("a"))).toBe(true);
      expect(equals(new Boolean(false), new Boolean(false))).toBe(true);
    });

    it("should compare maps by size and entries, with deep values", () => {
      expect(
        equals(
          new Map([
            ["a", { x: 1 }],
            ["b", [2]]
          ]),
          new Map([
            ["b", [2]],
            ["a", { x: 1 }]
          ])
        )
      ).toBe(true);
    });

    it("should compare sets by size and membership, with deep members", () => {
      expect(equals(new Set([1, { a: 1 }]), new Set([{ a: 1 }, 1]))).toBe(true);
    });

    it("should defer to an object's own equals method", () => {
      class Point extends Class {
        constructor(
          public x: number,
          public y: number
        ) {
          super();
        }
      }

      expect(equals(new Point(1, 2), new Point(1, 2))).toBe(true);
      expect(equals(new Point(1, 2), new Point(2, 1))).toBe(false);

      const yes = { equals: () => true };

      expect(equals(yes, { anything: "else" })).toBe(true);
    });

    it("should terminate on a structure that refers to itself", () => {
      const a: Record<string, unknown> = { name: "a" };

      const b: Record<string, unknown> = { name: "a" };

      a.self = a;
      b.self = b;

      expect(equals(a, b)).toBe(true);

      const c: unknown[] = [1];

      const d: unknown[] = [1];

      c.push(c);
      d.push(d);

      expect(equals(c, d)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should not confuse null with undefined or with anything else", () => {
      expect(equals(null, undefined)).toBe(false);
      expect(equals(null, 0)).toBe(false);
      expect(equals(undefined, "")).toBe(false);
      expect(equals(null, {})).toBe(false);
    });

    it("should not coerce across types", () => {
      expect(equals(1, "1")).toBe(false);
      expect(equals(0, false)).toBe(false);
      expect(equals("", false)).toBe(false);
      expect(equals(1, new Number(1))).toBe(false);
    });

    it("should compare arrays strictly by order and length", () => {
      expect(equals([1, 2], [2, 1])).toBe(false);
      expect(equals([1, 2], [1, 2, 3])).toBe(false);
      expect(equals([1, [2]], [1, [3]])).toBe(false);
    });

    it("should not equate an array with an array-like object", () => {
      expect(equals([1], { 0: 1, length: 1 })).toBe(false);
    });

    it("should compare plain objects strictly by keys", () => {
      expect(equals({ a: 1 }, { a: 1, b: undefined })).toBe(false);
      expect(equals({ a: 1 }, { a: 2 })).toBe(false);
      expect(equals({ a: undefined }, { b: undefined })).toBe(false);
    });

    it("should not equate objects of different prototypes", () => {
      class A {
        v = 1;
      }

      class B {
        v = 1;
      }

      expect(equals(new A(), new B())).toBe(false);
      expect(equals(new A(), { v: 1 })).toBe(false);
      expect(equals(Object.create(null), {})).toBe(false);
    });

    it("should compare class instances without equals by reference", () => {
      class A {
        v = 1;
      }

      expect(equals(new A(), new A())).toBe(false);
    });

    it("should compare functions and symbols by reference", () => {
      expect(
        equals(
          () => 1,
          () => 1
        )
      ).toBe(false);
      expect(equals(Symbol("s"), Symbol("s"))).toBe(false);
    });

    it("should tell dates, regular expressions and boxed primitives apart", () => {
      expect(equals(new Date(0), new Date(1))).toBe(false);
      expect(equals(/a/g, /a/i)).toBe(false);
      expect(equals(/a/, /b/)).toBe(false);
      expect(equals(new Number(1), new Number(2))).toBe(false);
    });

    it("should tell maps and sets apart by size, keys and members", () => {
      expect(equals(new Map([["a", 1]]), new Map([["b", 1]]))).toBe(false);
      expect(equals(new Map([["a", 1]]), new Map([["a", 2]]))).toBe(false);
      expect(equals(new Map(), new Map([["a", 1]]))).toBe(false);
      expect(equals(new Set([1]), new Set([2]))).toBe(false);
      expect(equals(new Set([{ a: 1 }]), new Set([{ a: 2 }]))).toBe(false);
    });

    it("should compare map keys by identity, not structure", () => {
      expect(equals(new Map([[{ k: 1 }, 1]]), new Map([[{ k: 1 }, 1]]))).toBe(false);
    });
  });
});
