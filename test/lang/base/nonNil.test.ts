import { nonNil, isNil } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNil", () => {
  describe("Correct input data", () => {
    it("should return false for both nil values", () => {
      expect(nonNil(null)).toBe(false);
      expect(nonNil(undefined)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for the other falsy values", () => {
      expect(nonNil(0)).toBe(true);
      expect(nonNil("")).toBe(true);
      expect(nonNil(false)).toBe(true);
      expect(nonNil(NaN)).toBe(true);
    });
  });

  describe("Agreement with isNil", () => {
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
        expect(nonNil(value as never)).toBe(!isNil(value));
      }
    });
  });
});
