import { nonNull, isNull } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNull", () => {
  describe("Correct input data", () => {
    it("should return false only for null", () => {
      expect(nonNull(null)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for undefined and the other falsy values", () => {
      expect(nonNull(undefined)).toBe(true);
      expect(nonNull(0)).toBe(true);
      expect(nonNull("")).toBe(true);
      expect(nonNull(false)).toBe(true);
    });
  });

  describe("Agreement with isNull", () => {
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
        expect(nonNull(value as never)).toBe(!isNull(value));
      }
    });
  });
});
