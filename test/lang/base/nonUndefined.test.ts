import { nonUndefined, isUndefined } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonUndefined", () => {
  describe("Correct input data", () => {
    it("should return false only for undefined", () => {
      expect(nonUndefined(undefined)).toBe(false);
      expect(nonUndefined(({} as { missing?: unknown }).missing)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for null and the other falsy values", () => {
      expect(nonUndefined(null)).toBe(true);
      expect(nonUndefined(0)).toBe(true);
      expect(nonUndefined("")).toBe(true);
    });
  });

  describe("Agreement with isUndefined", () => {
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
        expect(nonUndefined(value as never)).toBe(!isUndefined(value));
      }
    });
  });
});
