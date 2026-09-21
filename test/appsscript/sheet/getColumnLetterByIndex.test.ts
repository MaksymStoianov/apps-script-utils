import { getColumnLetterByIndex } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("getColumnLetterByIndex", () => {
  describe("Correct input data", () => {
    it("should map the first block of indices to single letters", () => {
      expect(getColumnLetterByIndex(0)).toBe("A");
      expect(getColumnLetterByIndex(1)).toBe("B");
      expect(getColumnLetterByIndex(25)).toBe("Z");
    });

    it("should roll over into two letters", () => {
      expect(getColumnLetterByIndex(26)).toBe("AA");
      expect(getColumnLetterByIndex(27)).toBe("AB");
      expect(getColumnLetterByIndex(51)).toBe("AZ");
      expect(getColumnLetterByIndex(52)).toBe("BA");
    });

    it("should roll over into three letters at the right point", () => {
      expect(getColumnLetterByIndex(701)).toBe("ZZ");
      expect(getColumnLetterByIndex(702)).toBe("AAA");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a negative index", () => {
      expect(() => getColumnLetterByIndex(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw for a non-integer index", () => {
      expect(() => getColumnLetterByIndex(1.5)).toThrow(IllegalArgumentException);
      expect(() => getColumnLetterByIndex(NaN)).toThrow(IllegalArgumentException);
      expect(() => getColumnLetterByIndex(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => getColumnLetterByIndex()).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getColumnLetterByIndex("0")).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => getColumnLetterByIndex(null)).toThrow(IllegalArgumentException);
    });
  });
});
