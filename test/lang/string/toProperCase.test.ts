import { EmptyStringException } from "@/exception";
import { toProperCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toProperCase", () => {
  describe("Correct input data", () => {
    it("should capitalise each word and lowercase the rest", () => {
      expect(toProperCase("hello world")).toBe("Hello World");
      expect(toProperCase("hELLO wORLD")).toBe("Hello World");
    });

    it("should preserve the separators between words", () => {
      expect(toProperCase("hello-world")).toBe("Hello-World");
      expect(toProperCase("hello, world")).toBe("Hello, World");
    });

    it("should handle a single word", () => {
      expect(toProperCase("hello")).toBe("Hello");
    });

    it("should capitalise words containing digits", () => {
      expect(toProperCase("q1 report")).toBe("Q1 Report");
    });
  });

  describe("Options", () => {
    it("should collapse and trim whitespace when asked", () => {
      expect(toProperCase("  hello   world  ", { trim: true })).toBe("Hello World");
    });

    it("should leave whitespace alone by default", () => {
      expect(toProperCase("  hello   world  ")).toBe("  Hello   World  ");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toProperCase("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toProperCase(null)).toThrow(EmptyStringException);
    });
  });
});
