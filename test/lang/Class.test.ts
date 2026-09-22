import { Class } from "@/lang";
import { describe, expect, it } from "vitest";

/**
 * A concrete subclass, since `Class` is abstract.
 */
class Point extends Class {
  constructor(
    public x: number,
    public y: number
  ) {
    super();
  }
}

/**
 * A second subclass with the same shape, to check constructor identity matters.
 */
class Vector extends Class {
  constructor(
    public x: number,
    public y: number
  ) {
    super();
  }
}

describe("Class", () => {
  describe("Symbol.toStringTag", () => {
    it("should report the subclass name", () => {
      expect(Object.prototype.toString.call(new Point(1, 2))).toBe("[object Point]");
      expect(Object.prototype.toString.call(new Vector(1, 2))).toBe("[object Vector]");
    });
  });

  describe("clone", () => {
    it("should produce an equal but distinct instance", () => {
      const original = new Point(1, 2);

      const copy = original.clone();

      expect(copy).not.toBe(original);
      expect(copy.x).toBe(1);
      expect(copy.y).toBe(2);
    });

    it("should preserve the prototype", () => {
      const copy = new Point(1, 2).clone();

      expect(copy).toBeInstanceOf(Point);
      expect(copy).toBeInstanceOf(Class);
    });

    it("should be shallow, sharing nested references", () => {
      class Holder extends Class {
        constructor(public items: number[]) {
          super();
        }
      }

      const original = new Holder([1, 2]);

      const copy = original.clone();

      expect(copy.items).toBe(original.items);
    });
  });

  describe("equals", () => {
    it("should be true for the same instance", () => {
      const point = new Point(1, 2);

      expect(point.equals(point)).toBe(true);
    });

    it("should be true for a distinct instance with the same values", () => {
      expect(new Point(1, 2).equals(new Point(1, 2))).toBe(true);
    });

    it("should be false when a value differs", () => {
      expect(new Point(1, 2).equals(new Point(1, 3))).toBe(false);
    });

    it("should be false for a different class with the same shape", () => {
      expect(new Point(1, 2).equals(new Vector(1, 2))).toBe(false);
    });

    it("should be false when the property counts differ", () => {
      const extended = new Point(1, 2) as Point & { z?: number };

      extended.z = 3;

      expect(new Point(1, 2).equals(extended)).toBe(false);
    });

    it("should be false for null", () => {
      expect(new Point(1, 2).equals(null)).toBe(false);
    });

    it("should hold for a clone", () => {
      const original = new Point(1, 2);

      expect(original.equals(original.clone())).toBe(true);
    });
  });

  describe("hashCode", () => {
    it("should be stable for the same instance", () => {
      const point = new Point(1, 2);

      expect(point.hashCode()).toBe(point.hashCode());
    });

    it("should agree for equal instances", () => {
      expect(new Point(1, 2).hashCode()).toBe(new Point(1, 2).hashCode());
    });

    it("should differ when a value differs", () => {
      expect(new Point(1, 2).hashCode()).not.toBe(new Point(1, 3).hashCode());
    });

    it("should return a number", () => {
      expect(new Point(1, 2).hashCode()).toBeTypeOf("number");
    });
  });
});
