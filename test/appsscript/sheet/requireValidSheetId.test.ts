import { requireValidSheetId } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireValidSheetId", () => {
  describe("Correct input data", () => {
    it("should return zero, the id of the first sheet, unchanged", () => {
      expect(requireValidSheetId(0)).toBe(0);
    });

    it("should return positive integers unchanged", () => {
      expect(requireValidSheetId(1)).toBe(1);
      expect(requireValidSheetId(1234567890)).toBe(1234567890);
    });

    it("should accept negative zero", () => {
      expect(requireValidSheetId(-0)).toBe(-0);
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for negative numbers", () => {
      expect(() => requireValidSheetId(-1)).toThrow(IllegalArgumentException);
    });

    it("should throw for NaN", () => {
      expect(() => requireValidSheetId(NaN)).toThrow(IllegalArgumentException);
    });

    it("should throw for numeric strings", () => {
      expect(() => requireValidSheetId("0")).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetId("123")).toThrow(IllegalArgumentException);
    });

    it("should throw for nil values and other types", () => {
      expect(() => requireValidSheetId(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetId(undefined)).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetId(true)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidSheetId(-1)).toThrow("Expected a valid sheet id.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidSheetId(-1, "The gid must be non-negative.")).toThrow(
        "The gid must be non-negative."
      );
    });
  });

  describe("Values that are numbers but not sheet ids", () => {
    it("should throw for fractions", () => {
      expect(() => requireValidSheetId(1.5)).toThrow(IllegalArgumentException);
    });

    it("should throw for Infinity and past the safe integer range", () => {
      expect(() => requireValidSheetId(Infinity)).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetId(Number.MAX_SAFE_INTEGER + 2)).toThrow(
        IllegalArgumentException
      );
    });
  });
});
