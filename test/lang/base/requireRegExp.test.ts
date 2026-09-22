import { IllegalArgumentException } from "@/exception";
import { requireRegExp } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireRegExp", () => {
  describe("Correct input data", () => {
    it("should return the same regular expression", () => {
      const pattern = /abc/gi;

      expect(requireRegExp(pattern)).toBe(pattern);
    });

    it("should accept literals and constructed instances", () => {
      expect(requireRegExp(/abc/)).toBeInstanceOf(RegExp);
      expect(requireRegExp(new RegExp("abc", "u"))).toBeInstanceOf(RegExp);
      expect(requireRegExp(/(?:)/)).toBeInstanceOf(RegExp);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for the RegExp constructor itself", () => {
      expect(() => requireRegExp(RegExp)).toThrow(IllegalArgumentException);
    });

    it("should throw for a pattern written as a string", () => {
      expect(() => requireRegExp("/abc/gi")).toThrow(IllegalArgumentException);
      expect(() => requireRegExp("abc")).toThrow(IllegalArgumentException);
    });

    it("should throw for a duck-typed lookalike", () => {
      expect(() => requireRegExp({ source: "abc", flags: "g", test: () => true })).toThrow(
        IllegalArgumentException
      );
    });

    it("should throw for nil values and other types", () => {
      expect(() => requireRegExp(null)).toThrow(IllegalArgumentException);
      expect(() => requireRegExp(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireRegExp({})).toThrow(IllegalArgumentException);
      expect(() => requireRegExp(new Date())).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireRegExp("abc")).toThrow("Expected a regular expression.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireRegExp("abc", "A pattern is required.")).toThrow(
        "A pattern is required."
      );
    });
  });
});
