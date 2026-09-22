import { EmptyStringException } from "@/exception";
import { toUpperCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toUpperCase", () => {
  describe("Correct input data", () => {
    it("should uppercase the value", () => {
      expect(toUpperCase("hello")).toBe("HELLO");
      expect(toUpperCase("HeLLo WoRLd")).toBe("HELLO WORLD");
    });

    it("should leave an already uppercase value unchanged", () => {
      expect(toUpperCase("HELLO")).toBe("HELLO");
    });

    it("should uppercase non-Latin scripts", () => {
      expect(toUpperCase("привет")).toBe("ПРИВЕТ");
    });

    it("should leave digits and punctuation alone", () => {
      expect(toUpperCase("a1-b2!")).toBe("A1-B2!");
    });
  });

  describe("Options", () => {
    it("should collapse and trim whitespace when asked", () => {
      expect(toUpperCase("  hello   world  ", { trim: true })).toBe("HELLO WORLD");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toUpperCase("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toUpperCase(null)).toThrow(EmptyStringException);
    });
  });
});
