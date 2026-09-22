import { getColumnPositionByLetter } from "@/appsscript";
import { EmptyStringException, IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("getColumnPositionByLetter", () => {
  describe("Correct input data", () => {
    it("should return a 1-based position for single letters", () => {
      expect(getColumnPositionByLetter("A")).toBe(1);
      expect(getColumnPositionByLetter("B")).toBe(2);
      expect(getColumnPositionByLetter("Z")).toBe(26);
    });

    it("should return a position for multi-letter labels", () => {
      expect(getColumnPositionByLetter("AA")).toBe(27);
      expect(getColumnPositionByLetter("AB")).toBe(28);
      expect(getColumnPositionByLetter("AZ")).toBe(52);
      expect(getColumnPositionByLetter("BA")).toBe(53);
      expect(getColumnPositionByLetter("AAA")).toBe(703);
    });

    it("should be case-insensitive", () => {
      expect(getColumnPositionByLetter("a")).toBe(1);
      expect(getColumnPositionByLetter("aa")).toBe(27);
    });

    it("should never return null for a well-formed label", () => {
      for (const letter of ["A", "M", "Z", "AA", "ZZ", "AAA"]) {
        expect(getColumnPositionByLetter(letter)).toBeGreaterThan(0);
      }
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => getColumnPositionByLetter()).toThrow(IllegalArgumentException);
    });

    it("should throw for an empty string", () => {
      expect(() => getColumnPositionByLetter("")).toThrow(EmptyStringException);
      expect(() => getColumnPositionByLetter("   ")).toThrow();
    });

    it("should throw for labels with non-alphabetic characters", () => {
      expect(() => getColumnPositionByLetter("A1")).toThrow(SyntaxError);
      expect(() => getColumnPositionByLetter("1")).toThrow(SyntaxError);
      expect(() => getColumnPositionByLetter("A-B")).toThrow(SyntaxError);
    });

    it("should throw for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getColumnPositionByLetter(null)).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => getColumnPositionByLetter(1)).toThrow(EmptyStringException);
    });
  });
});
