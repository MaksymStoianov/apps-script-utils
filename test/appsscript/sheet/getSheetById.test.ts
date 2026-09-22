import { getSheetById } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { describe, expect, it } from "vitest";

/**
 * A stand-in spreadsheet holding sheets with the given ids.
 */
function spreadsheetOf(...ids: number[]): GoogleAppsScript.Spreadsheet.Spreadsheet {
  return {
    getSheets: () => ids.map((id) => ({ getSheetId: () => id, id }))
  } as unknown as GoogleAppsScript.Spreadsheet.Spreadsheet;
}

describe("getSheetById", () => {
  describe("Correct input data", () => {
    it("should find a sheet by its id", () => {
      const sheet = getSheetById(42, spreadsheetOf(0, 42, 7));

      expect((sheet as unknown as { id: number }).id).toBe(42);
    });

    it("should find the first sheet, whose id is zero", () => {
      const sheet = getSheetById(0, spreadsheetOf(0, 42));

      expect((sheet as unknown as { id: number }).id).toBe(0);
    });

    it("should return null when no sheet matches", () => {
      expect(getSheetById(99, spreadsheetOf(0, 42))).toBeNull();
    });

    it("should return null for a spreadsheet with no sheets", () => {
      expect(getSheetById(0, spreadsheetOf())).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => getSheetById()).toThrow(IllegalArgumentException);
    });

    it("should throw for a negative or fractional id", () => {
      expect(() => getSheetById(-1, spreadsheetOf(0))).toThrow(IllegalArgumentException);
      expect(() => getSheetById(1.5, spreadsheetOf(0))).toThrow(IllegalArgumentException);
    });

    it("should throw for a non-numeric id", () => {
      // @ts-expect-error - testing invalid types
      expect(() => getSheetById("0", spreadsheetOf(0))).toThrow(IllegalArgumentException);
      // @ts-expect-error - testing invalid types
      expect(() => getSheetById(null, spreadsheetOf(0))).toThrow(IllegalArgumentException);
    });
  });
});
