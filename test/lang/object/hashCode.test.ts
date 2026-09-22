import { hashCode } from "@/lang";
import { describe, expect, it } from "vitest";

describe("hashCode", () => {
  describe("Determinism", () => {
    it("should return the same hash for the same input", () => {
      expect(hashCode("abc")).toBe(hashCode("abc"));
      expect(hashCode({ a: 1 })).toBe(hashCode({ a: 1 }));
    });

    it("should return different hashes for different strings", () => {
      expect(hashCode("abc")).not.toBe(hashCode("abd"));
    });
  });

  describe("Primitives", () => {
    it("should hash strings, numbers and booleans", () => {
      expect(hashCode("abc")).toBeTypeOf("number");
      expect(hashCode(42)).toBeTypeOf("number");
      expect(hashCode(true)).toBeTypeOf("number");
    });

    it("should return zero for an empty string", () => {
      expect(hashCode("")).toBe(0);
    });

    it("should hash a number and its string form alike, since both stringify the same", () => {
      expect(hashCode(42)).toBe(hashCode("42"));
    });
  });

  describe("Nil values", () => {
    it("should hash null and undefined without throwing", () => {
      expect(hashCode(null)).toBeTypeOf("number");
      expect(hashCode(undefined)).toBeTypeOf("number");
    });

    it("should distinguish them from each other", () => {
      expect(hashCode(null)).not.toBe(hashCode(undefined));
    });
  });

  describe("Objects", () => {
    it("should hash plain objects and arrays", () => {
      expect(hashCode({ a: 1 })).toBeTypeOf("number");
      expect(hashCode([1, 2, 3])).toBeTypeOf("number");
    });

    it("should distinguish an array from an object with the same contents", () => {
      expect(hashCode([1])).not.toBe(hashCode({ 0: 1 }));
    });

    it("should be sensitive to a changed property", () => {
      expect(hashCode({ a: 1 })).not.toBe(hashCode({ a: 2 }));
    });
  });

  describe("Range", () => {
    it("should stay within 32-bit signed integer bounds", () => {
      const values = ["", "a", "abc", "a much longer string to hash", "\u00A0\u4E2D\u6587"];

      for (const value of values) {
        const hash = hashCode(value);

        expect(Number.isSafeInteger(hash)).toBe(true);
        expect(hash).toBeGreaterThanOrEqual(-(2 ** 31));
        expect(hash).toBeLessThanOrEqual(2 ** 31 - 1);
      }
    });
  });
});
