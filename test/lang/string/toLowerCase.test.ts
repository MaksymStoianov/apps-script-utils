import { EmptyStringException } from "@/exception";
import { toLowerCase } from "@/lang";
import { describe, expect, it } from "vitest";

describe("toLowerCase", () => {
  describe("Correct input data", () => {
    it("should lowercase the value", () => {
      expect(toLowerCase("HELLO")).toBe("hello");
      expect(toLowerCase("HeLLo WoRLd")).toBe("hello world");
    });

    it("should leave an already lowercase value unchanged", () => {
      expect(toLowerCase("hello")).toBe("hello");
    });

    it("should lowercase non-Latin scripts", () => {
      expect(toLowerCase("ПРИВЕТ")).toBe("привет");
    });

    it("should leave digits and punctuation alone", () => {
      expect(toLowerCase("A1-B2!")).toBe("a1-b2!");
    });
  });

  describe("Options", () => {
    it("should collapse and trim whitespace when asked", () => {
      expect(toLowerCase("  HELLO   WORLD  ", { trim: true })).toBe("hello world");
    });

    it("should leave whitespace alone by default", () => {
      expect(toLowerCase("  HELLO  ")).toBe("  hello  ");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for empty and non-string input", () => {
      expect(() => toLowerCase("")).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => toLowerCase(null)).toThrow(EmptyStringException);
    });
  });
});
