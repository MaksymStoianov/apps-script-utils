import { getColumnIndexByLetter } from "@/appsscript";
import { EmptyStringException, IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("getColumnIndexByLetter", () => {
  describe("Correct input data", () => {
    it("should return a zero-based index for single letters", () => {
      expect(getColumnIndexByLetter("A")).toBe(0);
      expect(getColumnIndexByLetter("B")).toBe(1);
      expect(getColumnIndexByLetter("Z")).toBe(25);
    });

    it("should return an index for multi-letter labels", () => {
      expect(getColumnIndexByLetter("AA")).toBe(26);
      expect(getColumnIndexByLetter("AB")).toBe(27);
      expect(getColumnIndexByLetter("AZ")).toBe(51);
      expect(getColumnIndexByLetter("BA")).toBe(52);
      expect(getColumnIndexByLetter("AAA")).toBe(702);
    });

    it("should be case-insensitive", () => {
      expect(getColumnIndexByLetter("a")).toBe(0);
      expect(getColumnIndexByLetter("aa")).toBe(26);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => getColumnIndexByLetter()).toThrow(IllegalArgumentException);
    });

    it("should throw for an empty string", () => {
      expect(() => getColumnIndexByLetter("")).toThrow(EmptyStringException);
    });

    it("should throw for labels with non-alphabetic characters", () => {
      expect(() => getColumnIndexByLetter("A1")).toThrow(SyntaxError);
      expect(() => getColumnIndexByLetter("1")).toThrow(SyntaxError);
      expect(() => getColumnIndexByLetter("A-B")).toThrow(SyntaxError);
    });

    it("should throw for non-string types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getColumnIndexByLetter(null)).toThrow(EmptyStringException);
      // @ts-expect-error - testing invalid types
      expect(() => getColumnIndexByLetter(1)).toThrow(EmptyStringException);
    });
  });
});
