import { getColumnLetterByPosition } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("getColumnLetterByPosition", () => {
  describe("Correct input data", () => {
    it("should return a single letter for the first positions", () => {
      expect(getColumnLetterByPosition(1)).toBe("A");
      expect(getColumnLetterByPosition(2)).toBe("B");
      expect(getColumnLetterByPosition(26)).toBe("Z");
    });

    it("should return a two-letter label past the first block", () => {
      expect(getColumnLetterByPosition(27)).toBe("AA");
      expect(getColumnLetterByPosition(28)).toBe("AB");
      expect(getColumnLetterByPosition(52)).toBe("AZ");
      expect(getColumnLetterByPosition(53)).toBe("BA");
    });

    it("should return a three-letter label for large positions", () => {
      expect(getColumnLetterByPosition(703)).toBe("AAA");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for a position below the first column", () => {
      expect(() => getColumnLetterByPosition(0)).toThrow(IllegalArgumentException);
      expect(() => getColumnLetterByPosition(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-integer positions", () => {
      expect(() => getColumnLetterByPosition(1.5)).toThrow(IllegalArgumentException);
      expect(() => getColumnLetterByPosition(NaN)).toThrow(IllegalArgumentException);
      expect(() => getColumnLetterByPosition(Infinity)).toThrow(IllegalArgumentException);
    });

    it("should throw for non-numeric types", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getColumnLetterByPosition("A")).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => getColumnLetterByPosition(null)).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => getColumnLetterByPosition(undefined)).toThrow(IllegalArgumentException);
    });
  });
});
