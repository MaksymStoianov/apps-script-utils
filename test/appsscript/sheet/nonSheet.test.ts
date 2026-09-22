import { nonSheet } from "@/appsscript";
import { describe, expect, it } from "vitest";

/**
 * Apps Script service objects report their class name from `toString()`.
 */
const match = { toString: (): string => "Sheet" };

describe("nonSheet", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as Sheet", () => {
      expect(nonSheet(match)).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a different service object", () => {
      expect(nonSheet({ toString: (): string => "Spreadsheet" })).toBe(true);
    });

    it("should return true for a plain object and the bare string", () => {
      expect(nonSheet({})).toBe(true);
      expect(nonSheet("Sheet")).toBe(true);
    });

    it("should return true for nil values and primitives", () => {
      expect(nonSheet(null)).toBe(true);
      expect(nonSheet(undefined)).toBe(true);
      expect(nonSheet(42)).toBe(true);
    });
  });
});
