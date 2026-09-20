import { nonSpreadsheet } from "@/appsscript";
import { describe, expect, it } from "vitest";

/** Apps Script service objects report their class name from `toString()`. */
const spreadsheetMock = { toString: (): string => "Spreadsheet" };
const sheetMock = { toString: (): string => "Sheet" };

describe("nonSpreadsheet", () => {
  describe("Correct input data", () => {
    it("should return false for an object reporting itself as Spreadsheet", () => {
      expect(nonSpreadsheet(spreadsheetMock)).toBe(false);
    });

    it("should return false when the object carries other members too", () => {
      expect(nonSpreadsheet({ ...spreadsheetMock, getId: (): string => "abc" })).toBe(false);
    });
  });

  describe("Incorrect input data", () => {
    it("should return true for a Sheet, which is a different service object", () => {
      expect(nonSpreadsheet(sheetMock)).toBe(true);
    });

    it("should return true for a differently-cased name", () => {
      expect(nonSpreadsheet({ toString: (): string => "spreadsheet" })).toBe(true);
    });

    it("should return true for a plain object, whose tag is [object Object]", () => {
      expect(nonSpreadsheet({})).toBe(true);
      expect(nonSpreadsheet({ getId: (): string => "abc" })).toBe(true);
    });

    it("should return true for the bare string Spreadsheet", () => {
      expect(nonSpreadsheet("Spreadsheet")).toBe(true);
    });

    it("should return true for nil values, primitives and arrays", () => {
      expect(nonSpreadsheet(null)).toBe(true);
      expect(nonSpreadsheet(undefined)).toBe(true);
      expect(nonSpreadsheet(42)).toBe(true);
      expect(nonSpreadsheet([])).toBe(true);
    });
  });
});
