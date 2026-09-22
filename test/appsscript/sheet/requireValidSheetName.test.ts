import { requireValidSheetName } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

describe("requireValidSheetName", () => {
  describe("Correct input data", () => {
    it("should return ordinary names unchanged", () => {
      expect(requireValidSheetName("Sheet1")).toBe("Sheet1");
      expect(requireValidSheetName("Report 2024")).toBe("Report 2024");
      expect(requireValidSheetName("Отчёт")).toBe("Отчёт");
    });

    it("should accept the length limit exactly", () => {
      const maximum = "a".repeat(100);

      expect(requireValidSheetName(maximum)).toBe(maximum);
    });

    it("should accept a name merely containing the reserved word", () => {
      expect(requireValidSheetName("History of changes")).toBe("History of changes");
    });
  });

  describe("Incorrect input data", () => {
    it("should throw for the reserved name in any casing", () => {
      expect(() => requireValidSheetName("History")).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetName("history")).toThrow(IllegalArgumentException);
    });

    it("should throw for each forbidden character", () => {
      for (const name of ["a\\b", "a/b", "a?b", "a*b", "a[b", "a]b"]) {
        expect(() => requireValidSheetName(name)).toThrow(IllegalArgumentException);
      }
    });

    it("should throw past the length limit", () => {
      expect(() => requireValidSheetName("a".repeat(101))).toThrow(IllegalArgumentException);
    });

    it("should throw for empty and whitespace-only names", () => {
      expect(() => requireValidSheetName("")).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetName("   ")).toThrow(IllegalArgumentException);
    });

    it("should throw for non-string types", () => {
      expect(() => requireValidSheetName(null)).toThrow(IllegalArgumentException);
      expect(() => requireValidSheetName(42)).toThrow(IllegalArgumentException);
    });

    it("should use the default message when none is provided", () => {
      expect(() => requireValidSheetName("Q1/Q2")).toThrow("Expected a valid sheet name.");
    });

    it("should use a custom message when provided", () => {
      expect(() => requireValidSheetName("Q1/Q2", "Slashes are not allowed.")).toThrow(
        "Slashes are not allowed."
      );
    });
  });
});
