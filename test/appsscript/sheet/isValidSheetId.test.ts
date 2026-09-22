import { isValidSheetId } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("isValidSheetId", () => {
  describe("Correct input data", () => {
    it("should return true for zero, the id of the first sheet", () => {
      expect(isValidSheetId(0)).toBe(true);
      expect(isValidSheetId(-0)).toBe(true);
    });

    it("should return true for positive integers", () => {
      expect(isValidSheetId(1)).toBe(true);
      expect(isValidSheetId(1234567890)).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for negative numbers", () => {
      expect(isValidSheetId(-1)).toBe(false);
    });

    it("should return false for fractions", () => {
      expect(isValidSheetId(1.5)).toBe(false);
      expect(isValidSheetId(0.1)).toBe(false);
    });

    it("should return false for Infinity and NaN", () => {
      expect(isValidSheetId(Infinity)).toBe(false);
      expect(isValidSheetId(-Infinity)).toBe(false);
      expect(isValidSheetId(NaN)).toBe(false);
    });

    it("should return false beyond the safe integer range", () => {
      expect(isValidSheetId(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    });

    it("should return false for numeric strings", () => {
      expect(isValidSheetId("0")).toBe(false);
      expect(isValidSheetId("123")).toBe(false);
    });

    it("should return false for nil values and other types", () => {
      expect(isValidSheetId(null)).toBe(false);
      expect(isValidSheetId(undefined)).toBe(false);
      expect(isValidSheetId(true)).toBe(false);
      expect(isValidSheetId([0])).toBe(false);
    });
  });
});
