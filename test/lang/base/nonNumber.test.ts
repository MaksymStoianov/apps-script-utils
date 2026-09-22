import { nonNumber, isNumber } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonNumber", () => {
  describe("Correct input data", () => {
    it("should return false for numbers, NaN and the infinities included", () => {
      expect(nonNumber(0)).toBe(false);
      expect(nonNumber(NaN)).toBe(false);
      expect(nonNumber(Infinity)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for numeric strings and bigints", () => {
      expect(nonNumber("42")).toBe(true);
      expect(nonNumber(42n)).toBe(true);
      expect(nonNumber(new Number(1))).toBe(true);
    });
  });

  describe("Agreement with isNumber", () => {
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
        expect(nonNumber(value as never)).toBe(!isNumber(value));
      }
    });
  });
});
