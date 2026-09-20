import { nonValidSheetName } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("nonValidSheetName", () => {
  describe("Correct input data", () => {
    it("should return false for ordinary names", () => {
      expect(nonValidSheetName("Sheet1")).toBe(false);
      expect(nonValidSheetName("Report 2024")).toBe(false);
      expect(nonValidSheetName("Отчёт")).toBe(false);
    });

    it("should return false for punctuation Sheets allows", () => {
      expect(nonValidSheetName("Q1-Q2")).toBe(false);
      expect(nonValidSheetName("Data (final)")).toBe(false);
    });

    it("should return false at exactly the length limit", () => {
      expect(nonValidSheetName("a".repeat(100))).toBe(false);
    });

    it("should return false for a name merely containing the reserved word", () => {
      expect(nonValidSheetName("History of changes")).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for the reserved name in any casing", () => {
      expect(nonValidSheetName("History")).toBe(true);
      expect(nonValidSheetName("history")).toBe(true);
      expect(nonValidSheetName("HISTORY")).toBe(true);
    });

    it("should return true for each forbidden character", () => {
      for (const name of ["a\\b", "a/b", "a?b", "a*b", "a[b", "a]b"]) {
        expect(nonValidSheetName(name)).toBe(true);
      }
    });

    it("should return true past the length limit", () => {
      expect(nonValidSheetName("a".repeat(101))).toBe(true);
    });

    it("should return true for empty and whitespace-only names", () => {
      expect(nonValidSheetName("")).toBe(true);
      expect(nonValidSheetName("   ")).toBe(true);
    });

    it("should return true for non-string types", () => {
      expect(nonValidSheetName(null)).toBe(true);
      expect(nonValidSheetName(undefined)).toBe(true);
      expect(nonValidSheetName(42)).toBe(true);
    });
  });
});
