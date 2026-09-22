import { nonScalar, isScalar } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonScalar", () => {
  describe("Correct input data", () => {
    it("should return false for every scalar primitive", () => {
      expect(nonScalar("abc")).toBe(false);
      expect(nonScalar(0)).toBe(false);
      expect(nonScalar(false)).toBe(false);
      expect(nonScalar(Symbol("s"))).toBe(false);
      expect(nonScalar(1n)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for containers, functions and nil values", () => {
      expect(nonScalar({})).toBe(true);
      expect(nonScalar([])).toBe(true);
      expect(nonScalar(() => {})).toBe(true);
      expect(nonScalar(null)).toBe(true);
      expect(nonScalar(undefined)).toBe(true);
    });
  });

  describe("Agreement with isScalar", () => {
    it("should be the exact inverse for every fixture", () => {
      const fixtures: unknown[] = [
        undefined,
        null,
        0,
        -0,
        NaN,
        Infinity,
        "",
        "abc",
        true,
        false,
        1n,
        Symbol("s"),
        {},
        [],
        new Date(),
        /re/,
        () => {}
      ];

      for (const value of fixtures) {
        expect(nonScalar(value as never)).toBe(!isScalar(value));
      }
    });
  });
});
