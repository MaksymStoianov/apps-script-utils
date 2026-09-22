import { getSheetByIndex } from "@/appsscript";
import { IllegalArgumentException } from "@/exception";
import { afterEach, describe, expect, it } from "vitest";

/**
 * A stand-in spreadsheet holding sheets with the given names, in order.
 */
function spreadsheetOf(...names: string[]): GoogleAppsScript.Spreadsheet.Spreadsheet {
  return {
    getSheets: () => names.map((name) => ({ getName: () => name, name }))
  } as unknown as GoogleAppsScript.Spreadsheet.Spreadsheet;
}

describe("getSheetByIndex", () => {
  describe("Correct input data", () => {
    it("should return the sheet at the given position", () => {
      const sheet = getSheetByIndex(1, spreadsheetOf("first", "second"));

      expect((sheet as unknown as { name: string }).name).toBe("second");
    });

    it("should treat the index as zero-based", () => {
      const sheet = getSheetByIndex(0, spreadsheetOf("first", "second"));

      expect((sheet as unknown as { name: string }).name).toBe("first");
    });

    it("should return null past the last sheet", () => {
      expect(getSheetByIndex(5, spreadsheetOf("first"))).toBeNull();
    });

    it("should return null for a spreadsheet with no sheets", () => {
      expect(getSheetByIndex(0, spreadsheetOf())).toBeNull();
    });
  });

  describe("Falling back to the active spreadsheet", () => {
    afterEach(() => {
      delete (globalThis as Record<string, unknown>).SpreadsheetApp;
    });

    it("should use the active spreadsheet when none is passed", () => {
      (globalThis as Record<string, unknown>).SpreadsheetApp = {
        getActiveSpreadsheet: () => spreadsheetOf("from active")
      };

      const sheet = getSheetByIndex(0);

      expect((sheet as unknown as { name: string }).name).toBe("from active");
    });

    it("should use the active spreadsheet when null is passed explicitly", () => {
      (globalThis as Record<string, unknown>).SpreadsheetApp = {
        getActiveSpreadsheet: () => spreadsheetOf("from active")
      };

      const sheet = getSheetByIndex(0, null);

      expect((sheet as unknown as { name: string }).name).toBe("from active");
    });

    it("should return null when there is no active spreadsheet", () => {
      (globalThis as Record<string, unknown>).SpreadsheetApp = {
        getActiveSpreadsheet: () => null
      };

      expect(getSheetByIndex(0)).toBeNull();
    });
  });

  describe("Incorrect input data", () => {
    it("should throw when called without arguments", () => {
      // @ts-expect-error - testing invalid arity
      expect(() => getSheetByIndex()).toThrow(IllegalArgumentException);
    });

    it("should throw for a negative or fractional index", () => {
      expect(() => getSheetByIndex(-1, spreadsheetOf("a"))).toThrow(IllegalArgumentException);
      expect(() => getSheetByIndex(1.5, spreadsheetOf("a"))).toThrow(IllegalArgumentException);
    });
  });
});
