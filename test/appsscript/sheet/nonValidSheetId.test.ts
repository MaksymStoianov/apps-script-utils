import { nonValidSheetId } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("nonValidSheetId", () => {
  describe("Correct input data", () => {
    it("should return false for zero, the id of the first sheet", () => {
      expect(nonValidSheetId(0)).toBe(false);
    });

    it("should return false for positive integers", () => {
      expect(nonValidSheetId(1)).toBe(false);
      expect(nonValidSheetId(1234567890)).toBe(false);
    });

    it("should return false for negative zero", () => {
      expect(nonValidSheetId(-0)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for negative numbers", () => {
      expect(nonValidSheetId(-1)).toBe(true);
    });

    it("should return true for NaN", () => {
      expect(nonValidSheetId(NaN)).toBe(true);
    });

    it("should return true for numeric strings", () => {
      expect(nonValidSheetId("0")).toBe(true);
      expect(nonValidSheetId("123")).toBe(true);
    });

    it("should return true for nil values and other types", () => {
      expect(nonValidSheetId(null)).toBe(true);
      expect(nonValidSheetId(undefined)).toBe(true);
      expect(nonValidSheetId(true)).toBe(true);
      expect(nonValidSheetId([0])).toBe(true);
    });
  });

  describe("Values that are numbers but not sheet ids", () => {
    it("should return true for fractions", () => {
      expect(nonValidSheetId(1.5)).toBe(true);
      expect(nonValidSheetId(0.1)).toBe(true);
    });

    it("should return true for Infinity and past the safe integer range", () => {
      expect(nonValidSheetId(Infinity)).toBe(true);
      expect(nonValidSheetId(Number.MAX_SAFE_INTEGER + 2)).toBe(true);
    });
  });
});
