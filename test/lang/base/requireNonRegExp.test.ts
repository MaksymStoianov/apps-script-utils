import { IllegalArgumentException } from "@/exception";
import { requireNonRegExp } from "@/lang";
import { describe, expect, it } from "vitest";

describe("requireNonRegExp", () => {
  describe("Correct input data", () => {
    it("should return strings unchanged, including pattern-looking ones", () => {
      expect(requireNonRegExp("abc")).toBe("abc");
      expect(requireNonRegExp("/abc/gi")).toBe("/abc/gi");
    });

    it("should return nil values and primitives unchanged", () => {
      expect(requireNonRegExp(null)).toBeNull();
      expect(requireNonRegExp(undefined)).toBeUndefined();
      expect(requireNonRegExp(0)).toBe(0);
    });

    it("should accept the RegExp constructor and duck-typed lookalikes", () => {
      expect(requireNonRegExp(RegExp)).toBe(RegExp);

      const lookalike = { source: "abc", flags: "g", test: () => true };

      expect(requireNonRegExp(lookalike)).toBe(lookalike);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for regular expression literals", () => {
      expect(() => requireNonRegExp(/abc/)).toThrow(IllegalArgumentException);
      expect(() => requireNonRegExp(/abc/gi)).toThrow(IllegalArgumentException);
    });

    it("should throw for constructed instances", () => {
      expect(() => requireNonRegExp(new RegExp("abc"))).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireNonRegExp(/abc/)).toThrow(
        "Expected a value that is not a regular expression."
      );
    });

    it("should use a custom message when provided", () => {
      expect(() => requireNonRegExp(/abc/, "A literal value is required.")).toThrow(
        "A literal value is required."
      );
    });
  });
});
