import { isValidSheetName } from "@/appsscript";
import { describe, expect, it } from "vitest";

describe("isValidSheetName", () => {
  describe("Correct input data", () => {
    it("should return true for ordinary names", () => {
      expect(isValidSheetName("Sheet1")).toBe(true);
      expect(isValidSheetName("Report 2024")).toBe(true);
      expect(isValidSheetName("Отчёт")).toBe(true);
    });

    it("should return true for punctuation Sheets does allow", () => {
      expect(isValidSheetName("Q1-Q2")).toBe(true);
      expect(isValidSheetName("Data (final)")).toBe(true);
      expect(isValidSheetName("a.b_c")).toBe(true);
    });

    it("should return true at exactly the length limit", () => {
      expect(isValidSheetName("a".repeat(100))).toBe(true);
    });

    it("should return true for a name merely containing the reserved word", () => {
      expect(isValidSheetName("History of changes")).toBe(true);
    });
  });

  describe("Incorrect input data", () => {
    it("should return false for the reserved name in any casing", () => {
      expect(isValidSheetName("History")).toBe(false);
      expect(isValidSheetName("history")).toBe(false);
      expect(isValidSheetName("HISTORY")).toBe(false);
    });

    it("should return false for each forbidden character", () => {
      for (const name of ["a\\b", "a/b", "a?b", "a*b", "a[b", "a]b"]) {
        expect(isValidSheetName(name)).toBe(false);
      }
    });

    it("should return false past the length limit", () => {
      expect(isValidSheetName("a".repeat(101))).toBe(false);
    });

    it("should return false for empty and whitespace-only names", () => {
      expect(isValidSheetName("")).toBe(false);
      expect(isValidSheetName("   ")).toBe(false);
      expect(isValidSheetName("\t\n")).toBe(false);
    });

    it("should return false for non-string types", () => {
      expect(isValidSheetName(null)).toBe(false);
      expect(isValidSheetName(undefined)).toBe(false);
      expect(isValidSheetName(42)).toBe(false);
      expect(isValidSheetName(["Sheet1"])).toBe(false);
    });
  });
});
