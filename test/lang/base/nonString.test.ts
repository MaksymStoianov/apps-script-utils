import { nonString, isString } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonString", () => {
  describe("Correct input data", () => {
    it("should return false for string primitives", () => {
      expect(nonString("")).toBe(false);
      expect(nonString("abc")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for non-strings", () => {
      expect(nonString(42)).toBe(true);
      expect(nonString(null)).toBe(true);
      expect(nonString(new String("abc"))).toBe(true);
    });
  });

  describe("Agreement with isString", () => {
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
        expect(nonString(value as never)).toBe(!isString(value));
      }
    });
  });
});
