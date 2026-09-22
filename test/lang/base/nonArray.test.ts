import { nonArray, isArray } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonArray", () => {
  describe("Correct input data", () => {
    it("should return false for arrays", () => {
      expect(nonArray([])).toBe(false);
      expect(nonArray([1, 2])).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for non-arrays", () => {
      expect(nonArray("abc")).toBe(true);
      expect(nonArray({ 0: "a", length: 1 })).toBe(true);
      expect(nonArray(new Set([1]))).toBe(true);
      expect(nonArray(null)).toBe(true);
    });
  });

  describe("Agreement with isArray", () => {
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
        expect(nonArray(value as never)).toBe(!isArray(value));
      }
    });
  });
});
