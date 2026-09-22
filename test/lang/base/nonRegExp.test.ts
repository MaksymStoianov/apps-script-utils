import { nonRegExp } from "@/lang";
import { describe, expect, it } from "vitest";

describe("nonRegExp", () => {
  describe("Correct input data", () => {
    it("should return false for regular expression literals", () => {
      expect(nonRegExp(/abc/)).toBe(false);
      expect(nonRegExp(/abc/gi)).toBe(false);
      expect(nonRegExp(/(?:)/)).toBe(false);
    });

    it("should return false for RegExp instances", () => {
      expect(nonRegExp(new RegExp("abc"))).toBe(false);
      expect(nonRegExp(new RegExp("abc", "u"))).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for the RegExp constructor itself", () => {
      expect(nonRegExp(RegExp)).toBe(true);
    });

    it("should return true for a string that looks like a pattern", () => {
      expect(nonRegExp("/abc/gi")).toBe(true);
      expect(nonRegExp("abc")).toBe(true);
    });

    it("should return true for nil values", () => {
      expect(nonRegExp(null)).toBe(true);
      expect(nonRegExp(undefined)).toBe(true);
    });

    it("should return true for other objects and primitives", () => {
      expect(nonRegExp({})).toBe(true);
      expect(nonRegExp([])).toBe(true);
      expect(nonRegExp(new Date())).toBe(true);
      expect(nonRegExp(0)).toBe(true);
      expect(nonRegExp({ source: "abc", flags: "g", test: () => true })).toBe(true);
    });
  });
});
