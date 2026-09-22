import { nonBoolean, isBoolean } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonBoolean", () => {
  describe("Correct input data", () => {
    it("should return false for boolean primitives", () => {
      expect(nonBoolean(true)).toBe(false);
      expect(nonBoolean(false)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for truthy and falsy stand-ins", () => {
      expect(nonBoolean(1)).toBe(true);
      expect(nonBoolean(0)).toBe(true);
      expect(nonBoolean("true")).toBe(true);
      expect(nonBoolean(new Boolean(true))).toBe(true);
    });
  });

  describe("Agreement with isBoolean", () => {
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
        expect(nonBoolean(value as never)).toBe(!isBoolean(value));
      }
    });
  });
});
