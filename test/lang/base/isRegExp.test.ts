import { isRegExp } from "@/lang";
import { describe, expect, it } from "vitest";

describe("isRegExp", () => {
  describe("Correct input data", () => {
    it("should return true for literals and instances", () => {
      expect(isRegExp(/abc/)).toBe(true);
      expect(isRegExp(/abc/gi)).toBe(true);
      expect(isRegExp(new RegExp("abc"))).toBe(true);
      expect(isRegExp(/(?:)/)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for the RegExp constructor itself", () => {
      expect(isRegExp(RegExp)).toBe(false);
    });

    it("should return false for a duck-typed lookalike", () => {
      expect(isRegExp({ source: "abc", flags: "g", test: () => true })).toBe(false);
    });

    it("should return false for a pattern written as a string", () => {
      expect(isRegExp("/abc/gi")).toBe(false);
    });

    it("should return false for nil values and other objects", () => {
      expect(isRegExp(null)).toBe(false);
      expect(isRegExp(undefined)).toBe(false);
      expect(isRegExp(new Date())).toBe(false);
    });
  });
});
